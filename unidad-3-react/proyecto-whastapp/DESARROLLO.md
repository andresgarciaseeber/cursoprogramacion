# WhatsApp Clone - Aplicación de Mensajería

Esta es una aplicación de mensajería funcional similar a WhatsApp Web, desarrollada siguiendo el estilo y patrones del curso.

## Características Implementadas

### Funcionalidades Principales

1. **Lista de Contactos**
   - Visualización de contactos con avatar, nombre y último mensaje
   - Indicador visual del contacto seleccionado
   - Carga simulada de contactos (500ms)

2. **Búsqueda de Contactos**
   - Barra de búsqueda funcional
   - Filtrado en tiempo real por nombre de contacto

3. **Chat de Mensajería**
   - Visualización de mensajes en formato conversación
   - Distinción visual entre mensajes enviados y recibidos
   - Timestamp en cada mensaje
   - Header con avatar y nombre del contacto seleccionado

4. **Envío de Mensajes**
   - Input para escribir nuevos mensajes
   - Envío mediante botón o tecla Enter
   - Actualización instantánea de la lista de mensajes

5. **Estado de la Aplicación**
   - Estado global para el contacto seleccionado
   - Mensajes persistentes por contacto
   - Pantalla de bienvenida cuando no hay contacto seleccionado

## Estructura de Componentes

```
src/
├── Components/
│   ├── ContactSidebar/      # Sidebar izquierdo con búsqueda y lista
│   ├── ContactList/         # Lista de contactos
│   ├── ContactItem/         # Item individual de contacto
│   ├── SearchBar/           # Barra de búsqueda
│   ├── ChatScreen/          # Pantalla principal de chat
│   ├── MessageList/         # Lista de mensajes
│   ├── MessageItem/         # Mensaje individual
│   └── MessageInput/        # Input para enviar mensajes
├── data/
│   ├── contactData.js       # Datos de contactos
│   └── messageData.js       # Datos de mensajes por contacto
├── services/
│   ├── contactService.js    # Servicio para obtener contactos
│   └── messageService.js    # Servicio para mensajes
├── App.jsx                  # Componente principal
├── App.css                  # Estilos globales estilo WhatsApp
└── main.jsx                 # Punto de entrada
```

## Patrones y Convenciones del Profesor

- **Nomenclatura**: snake_case para propiedades de objetos (contact_id, contact_name, etc.)
- **Componentes**: Uso de export default
- **Estados**: useState para manejo de estado local
- **Efectos**: useEffect para carga de datos
- **Simulación**: setTimeout para simular carga asíncrona
- **Funciones**: Declaración de funciones dentro de componentes
- **Comentarios**: Comentarios descriptivos de responsabilidades

## Estilos

La aplicación usa estilos personalizados CSS que replican la interfaz de WhatsApp Web:
- Esquema de colores oscuros
- Diseño responsive
- Transiciones suaves
- Scrollbars personalizados

## Cómo Usar

1. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Seleccionar un contacto**: Click en cualquier contacto de la lista izquierda

3. **Enviar mensajes**: Escribir en el input inferior y presionar Enter o el botón "Enviar"

4. **Buscar contactos**: Usar la barra de búsqueda superior

## Datos de Ejemplo

La aplicación incluye:
- 5 contactos predefinidos
- Conversaciones con múltiples mensajes
- Avatares de ejemplo usando pravatar.cc

## Próximas Mejoras Sugeridas

- Agregar indicadores de estado de mensaje (enviado, recibido, leído)
- Implementar scroll automático al último mensaje
- Agregar formato de fecha más completo
- Persistencia de mensajes en localStorage
- Notificaciones de nuevos mensajes
- Emojis y adjuntos
