import React from 'react'

export default function SearchBar({ searchTerm, onSearchChange }) {
    function handleInputChange(event) {
        onSearchChange(event.target.value)
    }

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Buscar o comenzar una nueva conversación"
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    )
}
