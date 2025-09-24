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
*/

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