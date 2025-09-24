/* 
Vamos a tener una variable interna llamada password_db con un valor x de su preferencia
Vamos a solicitar al usuario una password y validaremos que esta sea correcta, si es incorrecta, deberemos decirselo y volver a solicitar
*/

/*

let password_db = '1234';

let password = prompt('Ingrese su password');
while (password !== password_db) {
    alert('La password es incorrecta');
    password = prompt('Ingrese su password');
}

*/

/* 
- Solicitar una operacion
- Validar que dicha operacion sea "iva" o "descuento"
    - Si no es volver a solicitar, a excepcion de que el usuario de cancelar, en dicho caso cancelar el programa y avisar al usuariio
    - Si la operacion es 'iva' solicitar un numero
        - validar el numero, en caso de no ser correcto volver a solicitar. (el numero debe ser positivo)
        - Si es correcto: mostrar por alerta el 21% del precio ingresado Ej: 'El iva de tu producto es ${resultado}'
    - Si la operacion es 'descuento' solicitar un numero (precio)
        - Validar el numero en caso de no ser correcto volver a solicitar (El numero debe ser positivo)
        - Solicitar un numero de descuento. 
            -Validar el numero de descuento (El numero debe ser positivo y menor a 100)
                -Volver a solicitar en caso de ser incorrecto
                Mostrar por alerta el porcentaje del numero ingresado. Ej:  "El descuento aplicado es de ${resultado}"
*/
 /*
let operacion = prompt('Ingrese una operacion');
while (operacion !== 'iva' && operacion !== 'descuento') {
    alert('Operacion invalida');
    operacion = prompt('Ingrese una operacion');
}

if (operacion === 'iva') {
    let precio = prompt('Ingrese un precio');
    while (isNaN(precio) || precio <= 0) {
        alert('Precio invalido');
        precio = prompt('Ingrese un precio');
    }
    precio = Number(precio);
    let iva = precio * 0.21;
    alert(`El iva de tu producto es ${iva}`);
} else if (operacion === 'descuento') {
    let precio = prompt('Ingrese un precio');
    while (isNaN(precio) || precio <= 0) {
        alert('Precio invalido');
        precio = prompt('Ingrese un precio');
    }
    precio = Number(precio);
    let descuento = prompt('Ingrese un descuento');
    while (isNaN(descuento) || descuento <= 0 || descuento >= 100) {
        alert('Descuento invalido');
        descuento = prompt('Ingrese un descuento');
    }
    descuento = Number(descuento);
    let descuento_aplicado = precio * (descuento / 100);
    alert(`El descuento aplicado es de ${descuento_aplicado}`);
}
*/

//FOR
//El bucle for lo usamos cuando conocemos el limite de repeticion, es decir cuantas veces queremos que una accion se repita
//Es un bucle de conteo ya que tiene un contador interno para medir la cantidad de iteraciones

/*
for(
    let contador = 1; //Marcamos donde inicia el contador 
    contador <= 10; //Limite, mientras esta condicion se cumpla ejecutar bloque de codigo
    contador = contador + 1 //Incremento: Con que ritmo se incrtementara mi contador
){
    console.log("hola mundo. El contador vale: " + contador)
}
*/
/* 
Solicitar 3 numeros y acumularlos
Ej: 1, 4, 10 
Mostrar por alerta al finalizar la sumatoria entre los numeros es 15
*/
/*
alert("Vamos a sumar 3 numeros");
let suma = 0;
for (let iteracion = 1; iteracion <= 3; iteracion = iteracion + 1) {
    let numero = parseFloat(prompt("Ingrese el numero"));
    suma = suma + numero

}
alert(`La sumatoria entre los numeros es ${suma}`);

*/
/* 
Solicitar 3 notas y calcular el promedio
*/
/*
let acumulador = 0;
for (let i = 1; i <= 3; i++) {
    let numero = prompt(`Ingrese la nota ${i} :`);
    while (isNaN(numero)) {
        if (numero === null) {
            alert("Operación cancelada");
            break;
        }
        alert("Número incorrecto, debe ser un número válido");
        numero = Number(prompt("Ingrese un número:"));
    }
    acumulador = Number(acumulador) + Number(numero);
}
trimestre = acumulador / 3;
alert(`El promedio del trimestre es ${trimestre}`);
*/