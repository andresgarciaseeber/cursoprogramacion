import React from 'react'

export default function MessageItem({ message }) {
    const { message_content, message_created_at, is_sent_by_me } = message

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    return (
        <div className={`message-item ${is_sent_by_me ? 'sent' : 'received'}`}>
            <div className="message-content">
                <p>{message_content}</p>
                <span className="message-time">{formatTime(message_created_at)}</span>
            </div>
        </div>
    )
}
