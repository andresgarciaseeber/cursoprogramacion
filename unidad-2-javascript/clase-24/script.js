/*
try intenta ejecutar un bloque de codigo
catch captura el error
*/


/*
try {
let a = 15

let suma = a + b 

console.log('La suma es: ' + suma)
} 
catch (error) {
    console.log('No se pudo realizar la operacion')
}

console.log('Programa finalizado')
*/


const modalContainer = document.querySelector('.modal-container')
const btnCloseModal = document.querySelector('.btn-close')
const modal = document.querySelector('.modal')
btnCloseModal.addEventListener('click', handleCloseModal)

function renderModal(title, text) {
    modal.innerHTML = `
        <button class="btn-close">X</button>
        <h2>${title}</h2>
        <p>${text}</p>
    `

    const btnCloseModal = document.querySelector('.btn-close');
    btnCloseModal.addEventListener('click', handleCloseModal);
    handleOpenmodal();
}

function handleOpenmodal() {
    modalContainer.classList.remove('close')
}

function handleCloseModal() {
    modalContainer.classList.add('close')
}
    

/* Porcentaje es un número del 1 al 100 que determina la tasa de éxito */
function determinarExito (porcentaje) {
    const factor_porcentaje = porcentaje / 100;
    const numero_aleatorio = Math.random();
    return factor_porcentaje > numero_aleatorio
}

const user_data = {
    nombre: 'pepe',
    id: 1,
    porcentaje: 80
}

function loadUserData () {
    if(determinarExito(80)) {
        return user_data
    } else {
        return null
    }
}

try {
    const user = loadUserData()
    if(!user) {
    // lanza un error al catch más cercano 
    //corta la ejecución del código
    throw new Error('Error al obtener los datos del usuario')
    }
    console.log('Usuario: ', user)

} catch (error) {
    console.log('No se pudo obtener los datos del usuario')
    renderModal('Error', error.message)
}


