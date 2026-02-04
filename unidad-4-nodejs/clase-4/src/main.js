// =============================================
// CLASE 4 - POO Parte 2: Herencia - Ejercicios
// =============================================

// ---- EJERCICIO 1: Sistema de Historial ----

class AccionHistorial {
    constructor(id, descripcion, fecha) {
        this.id = id
        this.descripcion = descripcion
        this.fecha = fecha
    }
}

class AccionInicioSesionHistorial extends AccionHistorial {
    constructor(id, fecha, dispositivo_origen, auth_type) {
        super(id, 'Alguien inicio sesion con tu cuenta', fecha)
        this.dispositivo_origen = dispositivo_origen
        this.auth_type = auth_type
    }
}

class AccionActualizarPerfilHistorial extends AccionHistorial {
    constructor(id, fecha, nombre_campo_actualizado, valor_campo_actualizado, valor_campo_anterior) {
        super(id, 'Un campo del perfil se actualizo', fecha)
        this.nombre_campo_actualizado = nombre_campo_actualizado
        this.valor_campo_actualizado = valor_campo_actualizado
        this.valor_campo_anterior = valor_campo_anterior
    }
}

// Pruebas Historial
console.log('===== HISTORIAL DE ACCIONES =====')
const accion1 = new AccionHistorial(1, 'Accion generica realizada', new Date())
const accion2 = new AccionInicioSesionHistorial(2, new Date(), 'PC de escritorio', 'google 0auth')
const accion3 = new AccionActualizarPerfilHistorial(3, new Date(), 'username', 'pepesito_nuevo', 'pepesito')

console.log(accion1)
console.log(accion2)
console.log(accion3)


// =============================================
// ---- EJERCICIO 2: Sistema de Inventario 2D ----
// =============================================

console.log('')
console.log('===== INVENTARIO 2D =====')

// --- Clase Item ---
class Item {
    constructor(id, titulo, nivel, descripcion) {
        this.id = id
        this.titulo = titulo
        this.nivel = nivel
        this.descripcion = descripcion
    }

    describir() {
        console.log(`[Item #${this.id}] ${this.titulo} (nivel ${this.nivel}): ${this.descripcion}`)
    }
}

// --- Clase ItemsLista (lista global de items del juego) ---
class ItemsLista {
    constructor() {
        this.items = []
        this._nextId = 1
    }

    crear(titulo, nivel, descripcion) {
        const nuevoItem = new Item(this._nextId, titulo, nivel, descripcion)
        this.items.push(nuevoItem)
        console.log(`Item creado: "${titulo}" con id ${this._nextId}`)
        this._nextId++
        return nuevoItem
    }

    eliminar(id_item) {
        const index = this.items.findIndex(i => i.id === id_item)
        if (index !== -1) {
            const eliminado = this.items.splice(index, 1)[0]
            console.log(`Item "${eliminado.titulo}" eliminado de la lista global`)
        } else {
            console.log(`Item con id ${id_item} no encontrado en la lista global`)
        }
    }

    obtenerPorId(id_item) {
        return this.items.find(i => i.id === id_item) || null
    }
}

// --- Clase CasilleroInventario ---
class CasilleroInventario {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
        this.cantidad = 0
        this.id_item = null
    }
}

// --- Clase Inventario (grilla 2D) ---
class Inventario {
    constructor(filas, columnas, cantidad_maxima_por_casillero, itemsLista) {
        this.filas = filas
        this.columnas = columnas
        this.cantidad_maxima_por_casillero = cantidad_maxima_por_casillero
        this.itemsLista = itemsLista
        this.items = []

        // Construir la grilla 2D de casilleros
        let idCasillero = 1
        for (let y = 1; y <= filas; y++) {
            const fila = []
            for (let x = 1; x <= columnas; x++) {
                fila.push(new CasilleroInventario(idCasillero, x, y))
                idCasillero++
            }
            this.items.push(fila)
        }
    }

    agregarItem(id_item, fila, columna, cantidad) {
        // Verificar que el item exista en la lista global
        const item = this.itemsLista.obtenerPorId(id_item)
        if (!item) {
            console.log('Error, Item no encontrado')
            return
        }

        // Obtener el casillero en esa posición (fila y columna arrancan en 1)
        const casillero = this.items[fila - 1]?.[columna - 1]
        if (!casillero) {
            console.log('Error, posición fuera de rango')
            return
        }

        // Si el casillero está vacío
        if (casillero.id_item === null) {
            casillero.id_item = id_item
            casillero.cantidad = cantidad
            console.log(`Se agregó "${item.titulo}" x${cantidad} en posición (${columna}, ${fila})`)
            return
        }

        // Si el casillero ya tiene algo
        if (casillero.id_item === id_item) {
            // Es el mismo item, intentar sumar cantidades
            const nuevaCantidad = casillero.cantidad + cantidad
            if (nuevaCantidad <= this.cantidad_maxima_por_casillero) {
                casillero.cantidad = nuevaCantidad
                console.log(`Se sumó "${item.titulo}" x${cantidad}. Total en casillero: ${nuevaCantidad}`)
            } else {
                console.log('Error, casillero ya esta lleno')
            }
        } else {
            console.log('Error, casillero ya ocupado')
        }
    }

    mostrar() {
        console.log(`\nInventario ${this.filas}x${this.columnas} (max por casillero: ${this.cantidad_maxima_por_casillero}):`)
        for (let y = 0; y < this.filas; y++) {
            const filaMostrar = this.items[y].map(c => {
                if (c.id_item === null) return '[  vacío  ]'
                const item = this.itemsLista.obtenerPorId(c.id_item)
                const nombre = item ? item.titulo : '???'
                return `[${nombre} x${c.cantidad}]`
            })
            console.log(` Fila ${y + 1}: ${filaMostrar.join(' ')}`)
        }
    }
}


// =============================================
// PRUEBAS DEL INVENTARIO 2D
// =============================================

// Crear la lista global de items del juego
const listaItems = new ItemsLista()
const espada = listaItems.crear('Espada larga', 5, 'Una espada afilada de acero')
const pocion = listaItems.crear('Poción de vida', 1, 'Restaura 50 puntos de vida')
const escudo = listaItems.crear('Escudo de roble', 3, 'Un escudo resistente')
const flecha = listaItems.crear('Flecha', 1, 'Proyectil básico de madera')

console.log('')
console.log('--- Items del juego ---')
listaItems.items.forEach(i => i.describir())

// Crear un inventario de 3 filas x 3 columnas, máximo 64 por casillero
const inventario = new Inventario(3, 3, 64, listaItems)

console.log('')
console.log('--- Inventario vacío ---')
inventario.mostrar()

console.log('')
console.log('--- Agregando items ---')
inventario.agregarItem(1, 1, 1, 1)    // Espada en (1,1) x1
inventario.agregarItem(2, 1, 2, 5)    // Poción en (1,2) x5
inventario.agregarItem(2, 1, 2, 10)   // Sumar pociones en (1,2) -> x15
inventario.agregarItem(3, 2, 1, 1)    // Escudo en (2,1) x1
inventario.agregarItem(4, 3, 3, 32)   // Flechas en (3,3) x32
inventario.agregarItem(4, 3, 3, 32)   // Sumar flechas -> x64
inventario.agregarItem(4, 3, 3, 1)    // Error: casillero lleno (superaría 64)
inventario.agregarItem(1, 1, 2, 1)    // Error: casillero ocupado (hay pociones ahí)
inventario.agregarItem(99, 1, 3, 1)   // Error: item no encontrado

inventario.mostrar()
