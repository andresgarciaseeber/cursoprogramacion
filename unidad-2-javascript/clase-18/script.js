function saludar(nombre){
    let saludo = "hola " + nombre;
    return saludo;
}

//console.log(saludar("pepe"));

//alert(saludar("pepe"));

//document.write(saludar("pepe"));


/* 
9) Crea una función llamada sumar(a,b) y nos devuelva la suma de a y b
10) Crea una función llamada restar(a,b) y nos devuelva la resta de a y b
11) Crea una función llamada calcular(operación,a,b) y dependiendo de si la operación es “+” o “-” invocar la función sumar(a,b) o restar(a,b) (retornar el resultado), en caso de recibir una operación no válida devolver null 
12) Crear una función llamada contarHasta(numero) y nos cuente hasta ese número por consola
25) definí una función esVocal que tome por parámetro un string letra y nos indique si letra es vocal con los cuales deben ser enviados. 
30) Definir una función convertirHorasenSEgundos que reciba argumento un número de horas y devuelva la conversión a segundos de dicha cantidad de horas.

*/
/*
function sumar(a,b){
    return a + b;
}   

function restar(a,b){
    return a - b;
}

function calcular(operacion,a,b){
    if (operacion === "+") {
        return sumar(a,b);
    } else if (operacion === "-") {
        return restar(a,b);
    } else {
        return null;
    }
}    

function contarHasta(numero){
    for (let i = 1; i <= numero; i++) {
        console.log(i);
    }
}

function esVocal(letra){
    if (letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u") {
        return true;
    } else {
        return false;
    }
}   

function convertirHorasenSEgundos(horas){
    return horas * 3600;
}
*/

/* 27)Necesitamos un programa que pida ingresar una cantidad de grados celsius y , mediante el siguiente mensaje: Ingresá una cantidad de grados celsius:
Con esta información el programa deberá mostrar la conversión a grados Celsius a grados Fahrenheit con el mensaje: La conversión en {Grados Celsius} es equivalente a Grados Fahrenheit {resultado}
Debería agregarlo con un prompt y que me lo devuelva por console.log  pero con todo el texto

*/
/*
function convertirGradosCelsiusAFahrenheit(gradosCelsius){
    return gradosCelsius * 1.8 + 32;
}

function convertirGradosFahrenheitACelsius(gradosFahrenheit){
    return (gradosFahrenheit - 32) / 1.8;
}


function mostrarMensaje(gradosCelsius){
    let gradosFahrenheit = convertirGradosCelsiusAFahrenheit(gradosCelsius);
    console.log(`La conversión en ${gradosCelsius} es equivalente a Grados Fahrenheit ${gradosFahrenheit}`);
}

mostrarMensaje(10);
*/
/*
Una función llamada solicitarTexto(mensaje_solicitud, mensaje_error)
La función solicitará un texto al usuario usando el mensaje solicitud de prompt
Validar queel texto sea un texto (no importa el número, comillas vacías o null)
Si el texto es inválido mostrar alerta de error y volver a solicitar
si el texto es válido retornarlo */

/*

function solicitarTexto(mensaje_solicitud, mensaje_error){
    let texto = prompt(mensaje_solicitud);
    while (!isNaN(texto) || texto === "" || texto === null) { 
        alert(mensaje_error);
        texto = prompt(mensaje_solicitud);
    }
    return texto;
}

solicitarTexto("Ingrese un texto", "El texto ingresado no es valido");

*/
/* Una función llamada solicitarNumero(mensaje_solicitud, mensaje_error)
La función solicitará un número al usuario usando el mensaje solicitud de prompt
Validar queel texto sea un número (Que no sea un texto, comillas vacías o null)
si el número es inválido mostrar alerta de error y volver a solicitar
si el número es válido retornarlo */


function solicitarNumero(mensaje_solicitud, mensaje_error, validacionCallback){
    let numero = parseFloat(prompt(mensaje_solicitud));
    while (!validacionCallback(numero)) { 
        alert(mensaje_error);
        numero = parseFloat(prompt(mensaje_solicitud));
    }
    return numero;
}

function validarNumero(numero){
    return numero && !isNaN(numero);
}

solicitarNumero("Ingrese un numero", "El numero ingresado no es valido", validarNumero);
