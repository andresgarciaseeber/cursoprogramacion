import React, { useEffect, useState } from 'react'
import ContactList from '../ContactList/ContactList'
import SearchBar from '../SearchBar/SearchBar'
import { getContactsList } from '../../services/contactService'

export default function ContactSidebar({ onSelectContact, selectedContactId }) {
    const [contacts, setContacts] = useState(null)
    const [loadingContacts, setLoadingContacts] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    function loadContacts() {
        setLoadingContacts(true)
        setTimeout(
            function () {
                const contacts_list_response = getContactsList()
                setContacts(contacts_list_response)
                setLoadingContacts(false)
            },
            500
        )
    }

    function handleSearchChange(term) {
        setSearchTerm(term)
    }

    function filterContacts() {
        if (!contacts) return null
        if (!searchTerm) return contacts

        return contacts.filter(
            (contact) => {
                return contact.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
            }
        )
    }

    useEffect(
        loadContacts,
        []
    )

    const filteredContacts = filterContacts()

    return (
        <div className="contact-sidebar">
            <div className="sidebar-header">
                <h2>WhatsApp</h2>
            </div>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <ContactList
                contacts={filteredContacts}
                loadingContacts={loadingContacts}
                onSelectContact={onSelectContact}
                selectedContactId={selectedContactId}
            />
        </div>
    )
}
