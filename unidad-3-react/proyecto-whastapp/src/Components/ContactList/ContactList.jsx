import React from 'react'
import ContactItem from '../ContactItem/ContactItem'

export default function ContactList({ contacts, loadingContacts, onSelectContact, selectedContactId }) {
    /* Responsabilidad de renderizar la lista */
    if (loadingContacts) {
        return <div className="contacts-loading">
            Cargando contactos...
        </div>
    }

    if (!contacts || contacts.length === 0) {
        return <div className="no-contacts">No tienes contactos</div>
    }

    return (
        <div className="contact-list">
            {
                contacts.map(
                    (contact) => {
                        return (
                            <ContactItem
                                contact={contact}
                                key={contact.contact_id}
                                onSelectContact={onSelectContact}
                                isSelected={contact.contact_id === selectedContactId}
                            />
                        )
                    }
                )
            }
        </div>
    )
}
