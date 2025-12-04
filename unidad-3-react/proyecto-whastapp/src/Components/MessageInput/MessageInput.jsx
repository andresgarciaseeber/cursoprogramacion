import React, { useState } from 'react'

export default function MessageInput({ onSendMessage }) {
    const [messageText, setMessageText] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        if (messageText.trim()) {
            onSendMessage(messageText)
            setMessageText('')
        }
    }

    function handleInputChange(event) {
        setMessageText(event.target.value)
    }

    return (
        <form className="message-input-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe un mensaje"
                value={messageText}
                onChange={handleInputChange}
                className="message-input"
            />
            <button type="submit" className="send-button">
                Enviar
            </button>
        </form>
    )
}
