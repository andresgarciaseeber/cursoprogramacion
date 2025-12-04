import { useState } from "react"
import ContactSidebar from "./Components/ContactSidebar/ContactSidebar"
import ChatScreen from "./Components/ChatScreen/ChatScreen"
import './App.css'

function App() {
  const [selectedContact, setSelectedContact] = useState(null)

  function handleSelectContact(contact) {
    setSelectedContact(contact)
  }

  return (
    <div className="app-container">
      <ContactSidebar
        onSelectContact={handleSelectContact}
        selectedContactId={selectedContact?.contact_id}
      />
      <ChatScreen selectedContact={selectedContact} />
    </div>
  )
}

export default App
