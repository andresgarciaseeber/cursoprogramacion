import React from 'react'
import MessageItem from '../MessageItem/MessageItem'

export default function MessageList({ messages, loadingMessages }) {
    /* Responsabilidad de renderizar la lista de mensajes */
    if (loadingMessages) {
        return <div className="messages-loading">
            Cargando mensajes...
        </div>
    }

    if (!messages || messages.length === 0) {
        return <div className="no-messages">No hay mensajes</div>
    }

    return (
        <div className="message-list">
            {
                messages.map(
                    (message) => {
                        return (
                            <MessageItem
                                message={message}
                                key={message.message_id}
                            />
                        )
                    }
                )
            }
        </div>
    )
}
