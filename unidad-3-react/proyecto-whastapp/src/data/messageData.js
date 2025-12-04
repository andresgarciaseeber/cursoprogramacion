const messages_data = {
    1: [
        {
            message_id: 1,
            contact_id: 1,
            message_content: 'Hola que tal',
            message_created_at: new Date('2024-12-03T10:30:00'),
            is_sent_by_me: false
        },
        {
            message_id: 2,
            contact_id: 1,
            message_content: 'Todo bien! Y vos?',
            message_created_at: new Date('2024-12-03T10:31:00'),
            is_sent_by_me: true
        },
        {
            message_id: 3,
            contact_id: 1,
            message_content: 'Genial! Charlamos más tarde',
            message_created_at: new Date('2024-12-03T10:32:00'),
            is_sent_by_me: false
        }
    ],
    2: [
        {
            message_id: 4,
            contact_id: 2,
            message_content: 'Saludar tu debes',
            message_created_at: new Date('2024-12-03T09:00:00'),
            is_sent_by_me: false
        },
        {
            message_id: 5,
            contact_id: 2,
            message_content: 'Hola maestro Yoda!',
            message_created_at: new Date('2024-12-03T09:05:00'),
            is_sent_by_me: true
        },
        {
            message_id: 6,
            contact_id: 2,
            message_content: 'Aprender mucho debes',
            message_created_at: new Date('2024-12-03T09:10:00'),
            is_sent_by_me: false
        }
    ],
    3: [
        {
            message_id: 7,
            contact_id: 3,
            message_content: 'Che, para mañana quedamos a las 5?',
            message_created_at: new Date('2024-12-02T18:40:00'),
            is_sent_by_me: false
        },
        {
            message_id: 8,
            contact_id: 3,
            message_content: 'Sí, perfecto!',
            message_created_at: new Date('2024-12-02T18:42:00'),
            is_sent_by_me: true
        },
        {
            message_id: 9,
            contact_id: 3,
            message_content: 'Nos vemos mañana!',
            message_created_at: new Date('2024-12-02T18:45:00'),
            is_sent_by_me: false
        }
    ],
    4: [
        {
            message_id: 10,
            contact_id: 4,
            message_content: 'Me pasas el archivo que te pedí?',
            message_created_at: new Date('2024-12-02T15:15:00'),
            is_sent_by_me: true
        },
        {
            message_id: 11,
            contact_id: 4,
            message_content: 'Perfecto, gracias',
            message_created_at: new Date('2024-12-02T15:20:00'),
            is_sent_by_me: false
        }
    ],
    5: [
        {
            message_id: 12,
            contact_id: 5,
            message_content: 'Todo listo para el proyecto?',
            message_created_at: new Date('2024-12-01T22:05:00'),
            is_sent_by_me: true
        },
        {
            message_id: 13,
            contact_id: 5,
            message_content: 'Dale, hablamos',
            message_created_at: new Date('2024-12-01T22:10:00'),
            is_sent_by_me: false
        }
    ]
}

export default messages_data
