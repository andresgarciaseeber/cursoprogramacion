
        // DATOS INICIALES
        let heroe = {
            nombre: "Héroe",
            dinero: 1000,
            vida: 100,
            edad: 30,
            nivel: 1,
            mano_derecha: null,
            inventario: []
        };

        let villano = {
            nombre: "Villano",
            dinero: 80000,
            vida: 400,
            edad: 70,
            nivel: 12,
            mano_derecha: null
        };

        let tiendaItems = {
            espada: { nombre: "Espada", costo: 200, nivel: 1, rareza: "comun", danio: 10 },
            baculo: { nombre: "Báculo Negro", costo: 5000, nivel: 5, rareza: "raro", danio: 35 },
            arco: { nombre: "Arco Endemoniado", costo: 100000, nivel: 15, rareza: "legendario", danio: 80 }
        };

        // EJEMPLO 1: Tienda
        function comprarItem() {
            let itemSeleccionado = document.getElementById('itemComprar').value;
            let item = tiendaItems[itemSeleccionado];
            let output = document.getElementById('output1');

            if (heroe.dinero >= item.costo) {
                heroe.dinero -= item.costo;
                
                let itemAnterior = heroe.mano_derecha;
                heroe.mano_derecha = item;

                let mensaje = `✅ ¡Compra exitosa!\n\n`;
                mensaje += `Has comprado: ${item.nombre}\n`;
                mensaje += `Dinero restante: ${heroe.dinero} monedas\n`;
                
                if (itemAnterior) {
                    mensaje += `\n📤 Item anterior (${itemAnterior.nombre}) fue guardado.`;
                }

                output.textContent = mensaje;
                actualizarUIPersonaje();
            } else {
                output.textContent = `❌ ¡Dinero insuficiente!\n\nNecesitas: ${item.costo} monedas\nTienes: ${heroe.dinero} monedas\nTe faltan: ${item.costo - heroe.dinero} monedas`;
            }
        }

        function actualizarUIPersonaje() {
            document.getElementById('dineroPersonaje').textContent = heroe.dinero;
            document.getElementById('itemEquipado').textContent = heroe.mano_derecha ? heroe.mano_derecha.nombre : 'Ninguno';
        }

        // EJEMPLO 2: Inventario
        function agregarItemAleatorio() {
            let items = Object.values(tiendaItems);
            let itemAleatorio = items[Math.floor(Math.random() * items.length)];
            
            let nuevoItem = {...itemAleatorio};
            heroe.inventario.push(nuevoItem);

            document.getElementById('output2').textContent = `➕ ${nuevoItem.nombre} agregado al inventario!\nTotal de items: ${heroe.inventario.length}`;
        }

        function mostrarInventario() {
            let output = document.getElementById('output2');
            
            if (heroe.inventario.length === 0) {
                output.textContent = '📦 El inventario está vacío.';
                return;
            }

            let mensaje = `📋 INVENTARIO (${heroe.inventario.length} items):\n\n`;
            heroe.inventario.forEach((item, index) => {
                mensaje += `${index + 1}. ${item.nombre} - ${item.rareza} (Valor: ${item.costo})\n`;
            });

            output.textContent = mensaje;
        }

        function calcularValorTotal() {
            let total = heroe.inventario.reduce((suma, item) => suma + item.costo, 0);
            document.getElementById('output2').textContent = `💎 Valor total del inventario: ${total} monedas`;
        }

        function limpiarInventario() {
            heroe.inventario = [];
            document.getElementById('output2').textContent = '🗑️ Inventario limpiado!';
        }

        // EJEMPLO 3: Combate
        function atacarVillano() {
            let danio = heroe.nivel * 5;
            if (heroe.mano_derecha) {
                danio += heroe.mano_derecha.danio;
            }

            villano.vida -= danio;
            if (villano.vida < 0) villano.vida = 0;

            document.getElementById('vidaVillano').textContent = villano.vida;
            
            let mensaje = `⚔️ Héroe ataca!\nDaño: ${danio}\nVida del Villano: ${villano.vida}`;
            
            if (villano.vida === 0) {
                mensaje += '\n\n🎉 ¡VICTORIA! El héroe ha ganado!';
            }

            document.getElementById('output3').textContent = mensaje;
        }

        function atacarHeroe() {
            let danio = villano.nivel * 8;
            
            heroe.vida -= danio;
            if (heroe.vida < 0) heroe.vida = 0;

            document.getElementById('vidaHeroe').textContent = heroe.vida;
            
            let mensaje = `💀 Villano ataca!\nDaño: ${danio}\nVida del Héroe: ${heroe.vida}`;
            
            if (heroe.vida === 0) {
                mensaje += '\n\n💀 DERROTA! El villano ha ganado!';
            }

            document.getElementById('output3').textContent = mensaje;
        }

        function reiniciarCombate() {
            heroe.vida = 100;
            villano.vida = 400;
            document.getElementById('vidaHeroe').textContent = heroe.vida;
            document.getElementById('vidaVillano').textContent = villano.vida;
            document.getElementById('output3').textContent = '🔄 Combate reiniciado!\n¡Que comience la batalla!';
        }

        // EJEMPLO 4: Métodos en Objetos
        let mascota = null;

        function crearMascota() {
            mascota = {
                nombre: "Firulais",
                tipo: "Perro",
                hambre: 50,
                felicidad: 50,
                energia: 100,
                
                // Métodos del objeto
                comer: function() {
                    this.hambre -= 20;
                    if (this.hambre < 0) this.hambre = 0;
                    this.energia += 10;
                    return `🍖 ${this.nombre} ha comido! Hambre: ${this.hambre}`;
                },
                
                jugar: function() {
                    this.felicidad += 20;
                    this.energia -= 15;
                    this.hambre += 10;
                    return `🎾 ${this.nombre} está jugando! Felicidad: ${this.felicidad}`;
                },
                
                mostrarEstado: function() {
                    return `📊 Estado de ${this.nombre}:\n` +
                           `Hambre: ${this.hambre}\n` +
                           `Felicidad: ${this.felicidad}\n` +
                           `Energía: ${this.energia}`;
                }
            };

            document.getElementById('output4').textContent = `🐕 ¡${mascota.nombre} ha sido creado!\n\n${mascota.mostrarEstado()}`;
        }

        function alimentarMascota() {
            if (!mascota) {
                document.getElementById('output4').textContent = '❌ Primero debes crear una mascota!';
                return;
            }
            document.getElementById('output4').textContent = mascota.comer() + '\n\n' + mascota.mostrarEstado();
        }

        function jugarConMascota() {
            if (!mascota) {
                document.getElementById('output4').textContent = '❌ Primero debes crear una mascota!';
                return;
            }
            document.getElementById('output4').textContent = mascota.jugar() + '\n\n' + mascota.mostrarEstado();
        }

        function estadoMascota() {
            if (!mascota) {
                document.getElementById('output4').textContent = '❌ Primero debes crear una mascota!';
                return;
            }
            document.getElementById('output4').textContent = mascota.mostrarEstado();
        }