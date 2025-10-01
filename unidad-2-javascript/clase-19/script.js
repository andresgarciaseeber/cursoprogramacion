/* Estos fueron los ejercicios dados por el profesor */

/* 
Crear la funcion doAndLogAction
Parametros:
    - description action log  Ejemplo: 'Estoy ejecutando una accion'
    - actionCallback La accion a ejecutar


Ejemplo de uso 
    doAndLogAction(
        'Estoy ejecutando una suma', 
        function(){
            let dato_1 = prompt('Ingrese numero 1')
            let dato_2 = prompt('Ingrese numero 2')
            alert(Number(dato_1) + Number(dato_2))
        }
    )
    Esto ejecutara 'Estoy ejecutando una suma' por consola
    y luego ejecutara la callback (osea la logica de la suma)
*/

/* 
function doAndLogAction(mensaje, callback){
    console.log(mensaje)
    callback()
}
doAndLogAction(
    'Estoy ejecutando una suma', 
    function(){
        let numero_1 = prompt('Ingrese numero 1')
        let numero_2 = prompt('Ingrese numero 2')
        alert(Number(numero_1) + Number(numero_2))
    }
)
 */

/* Creemos nuevos ejemplos que usen la doAndLogAction y la validacion pero que se impriman en el html */

function    doAndLogAction(mensaje, callback){
    console.log(mensaje)
    callback()
}

function validarNumero (numero){
    console.log('me ejecuto')
    return numero && !isNaN(numero)
}

/* Elementos que muestren los resultados de los ejercicios */
let p1 = document.getElementById('p1')
let p2 = document.getElementById('p2')

function sumar(){
    doAndLogAction(
        'Estoy ejecutando una suma', 
        function(){
            let dato_1 = prompt('Ingrese numero 1')
            let dato_2 = prompt('Ingrese numero 2')
            if(validarNumero(dato_1) && validarNumero(dato_2)){
                p1.innerHTML = Number(dato_1) + Number(dato_2)
            }else{
                p1.innerHTML = 'No es un numero'
            }
        }
    )
}