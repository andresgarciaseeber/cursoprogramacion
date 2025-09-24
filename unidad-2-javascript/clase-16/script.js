//1)
//Ingresar una operacion ('+', '-', '*', '/) (prompt)
//Verificar si la operacion ingresada es valida
//Si es valida vamos a mostrar por alerta 'Operacion valida'
//Si no mostrar 'Operacion invalida'

//2)
/* 
Solicitar un numero
verificar si el numero es un numero
en caso de serlo decir 'es un numero'
en caso de no serlo decir 'numero invalido
Pro tip: isNaN es una funcion a la que si le pasas un dato te dice si es un NAN
*/

/* 
3) 
Solicitar 2 numeros y validarlos usando la condicion del enunciado 2)
Solicitar una operacion y validarlo usando la condicion del enunciado 1)
En base a el valor de operacion debera pasar lo siguiente:
    '+': se sumaran los numeros y se mostrara por alerta
    '-': se restaran los numeros y se mostrara por alerta
    '*': se multiplcacaran los numeros y se mostrara por alerta
    '/': se dividiran los numero y se mostraran por alerta
Aclaraciones:
    - No se puede ejecutar la operacion si no se eligio una operacion valida
    - Si se ingreso un numero incorrectamente tampoco podra continuarse con la operacion
*/

/*
let operacion = prompt("Ingrese una operacion: ")
if (operacion >= "+" || operacion == "-" || operacion == "*" || operacion == "/") {
    alert("Operacion valida")
} else {
    alert("Operacion invalida")
}
    */

let calculo = prompt("Ingrese su año de nacimiento: ")

if (isNaN(calculo)) {
    alert("Ingrese un dato valido")
} else {
    calcularEdad()
}

function calcularEdad() {

    let anioActual = new Date().getFullYear()
    let edad = anioActual - calculo

    if (edad >= 18) {
        alert("Usted es mayor de edad")
    } else {
        alert("Usted es menor de edad")
    }

}

