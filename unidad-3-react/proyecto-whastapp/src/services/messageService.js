import messages_data from "../data/messageData";

function getMessagesByContactId(contact_id) {
    return messages_data[contact_id] || []
}

function sendMessage(contact_id, message_content) {
    const new_message = {
        message_id: Date.now(),
        contact_id: contact_id,
        message_content: message_content,
        message_created_at: new Date(),
        is_sent_by_me: true
    }

    if (!messages_data[contact_id]) {
        messages_data[contact_id] = []
    }

    messages_data[contact_id].push(new_message)
    return new_message
}

export { getMessagesByContactId, sendMessage }
