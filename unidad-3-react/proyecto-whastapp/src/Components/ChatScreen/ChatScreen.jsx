import React, { useEffect, useState } from 'react'
import MessageList from '../MessageList/MessageList'
import MessageInput from '../MessageInput/MessageInput'
import { getMessagesByContactId, sendMessage } from '../../services/messageService'

export default function ChatScreen({ selectedContact }) {
    const [messages, setMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(false)

    function loadMessages() {
        if (!selectedContact) {
            setMessages([])
            return
        }

        setLoadingMessages(true)
        setTimeout(
            function () {
                const messages_response = getMessagesByContactId(selectedContact.contact_id)
                setMessages(messages_response)
                setLoadingMessages(false)
            },
            500
        )
    }

    function handleSendMessage(message_content) {
        const new_message = sendMessage(selectedContact.contact_id, message_content)
        setMessages([...messages, new_message])
    }

    useEffect(
        loadMessages,
        [selectedContact]
    )

    if (!selectedContact) {
        return (
            <div className="chat-screen no-chat-selected">
                <div className="no-chat-message">
                    <h2>Selecciona un contacto para iniciar la conversación</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="chat-screen">
            <div className="chat-header">
                <img src={selectedContact.contact_avatar} alt={selectedContact.contact_name} width={40} />
                <h3>{selectedContact.contact_name}</h3>
            </div>
            <MessageList messages={messages} loadingMessages={loadingMessages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    )
}
