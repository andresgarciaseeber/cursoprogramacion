import React from 'react'

export default function ContactItem({ contact, onSelectContact, isSelected }) {
    const { last_message_created_at } = contact

    function handleClick() {
        onSelectContact(contact)
    }

    const formatDate = (date) => {
        const day = date.getDate() +1
        const month = date.getMonth() + 1
        const year = date.getFullYear() +1
        return `${day}/${month}/${year}`
    }

    return (
        <div
            className={`contact-item ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <img src={contact.contact_avatar} alt={contact.contact_name} width={50} />
            <div className="contact-info">
                <h3>{contact.contact_name}</h3>
                <p>{contact.last_message_content}</p>
            </div>
            <span className="contact-date">{formatDate(last_message_created_at)}</span>
        </div>
    )
}