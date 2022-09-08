// Variables Globales
const valorDolar = 4;
let ganancia = 1.1;
let step = 1;
let localMoneda = 'S/.'

// Constructor de Productos
class Product {
    constructor(name, socket, brand, price0) {
        this.name = name;
        this.socket = socket;
        this.brand = brand;
        this.price0 = price0;
        this.finalPrice = function () { return Math.round((this.price0 * valorDolar) * ganancia); };
    }
}

const asus = [
    { name: 'ASUS A320E', socket: 'AM4', brand: 'asus', price0: 50, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS B450M', socket: 'AM4', brand: 'asus', price0: 70, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS B460M', socket: 'LGA1200', brand: 'asus', price0: 60, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS H410M', socket: 'LGA1200', brand: 'asus', price0: 45, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]

const gigabyte = [
    { name: 'GB A320M', socket: 'AM4', brand: 'gigabyte', price0: 45, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'GB B450M', socket: 'AM4', brand: 'gigabyte', price0: 55, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'GB B460M', socket: 'LGA1200', brand: 'gigabyte', price0: 50, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'GB H410E', socket: 'LGA1200', brand: 'gigabyte', price0: 40, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]
const motherboards = {
    asus, gigabyte
}

const amd = [
    { name: 'Ryzen 3 3200g', socket: 'AM4', brand: 'amd', price0: 99, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'Ryzen 5 3400g', socket: 'AM4', brand: 'amd', price0: 159, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]
const intel = [
    { name: 'Core i3 10100F', socket: 'LGA1200', brand: 'intel', price0: 119, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'Core i5 10400F', socket: 'LGA1200', brand: 'intel', price0: 169, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]
const processors = {
    amd, intel
}

// Variables de Usuario
let userProcessor, userProcessorFinal, userMotherboard, userMotherboardFinal;
let carrito = [];
// Enlistando los procesadores que hay
let keysMotherboards;
let keysProcessors;



alert('Bienvenido a PCBuild \nArma la computadora que necesites!');
while ((step >= 0) && (step <= 4)) {
    let resultado = '\n'
    switch (step) {
        // Seleccione la marca de procesador
        case 1:
            keysProcessors = Object.keys(processors);
            for (let i = 0; i < keysProcessors.length; i++) {
                resultado += `${i + 1} - ${keysProcessors[i]}\n`;
            }
            userProcessor = parseInt(prompt(`Seleccione la marca de procesador que prefiere: ${resultado.toUpperCase()}`)) - 1;
            if (keysProcessors[userProcessor] !== undefined) {
                step++;
            } else {
                alert("El valor ingresado es inválido.")
            }
            break;
        // Seleccione la el modelo de procesador
        case 2:
            resultado = '\n'
            // Analizando por el procesador que eligio el usuario
            let processorsSelected = processors[keysProcessors[userProcessor]];
            processorsSelected.forEach(element => {
                resultado += `${processorsSelected.indexOf(element) + 1} - ${element.name} - ${localMoneda} ${element.finalPrice()}\n`;
            });
            userProcessorFinal = parseInt(prompt(`Tenemos disponible: ${resultado}`)) - 1;
            if (processorsSelected[userProcessorFinal] !== undefined) {
                // Agregando el procesador al carrito
                carrito.push(processors[keysProcessors[userProcessor]][userProcessorFinal])
                step++;
            } else {
                alert("El valor ingresado es inválido.");
            }
            break;
        // Seleccione la marca de Motherboards
        case 3:
            resultado = '\n'

            keysMotherboards = Object.keys(motherboards);
            for (let i = 0; i < keysMotherboards.length; i++) {
                resultado += `${i + 1} - ${keysMotherboards[i]}\n`;
            }
            userMotherboard = parseInt(prompt(`Seleccione la marca de motherboard que prefiere: ${resultado.toUpperCase()}`)) - 1;
            if (keysMotherboards[userMotherboard] !== undefined) {
                step++;
            } else {
                alert("El valor ingresado es inválido.")
            }
            break;
        // Seleccione la el modelo de motherboard
        case 4:
            resultado = '\n'
            // Analizando por la motherboard que eligio el usuario
            let motherboardSelected = motherboards[keysMotherboards[userMotherboard]];
            let motherboardsCompatibles = [];
            motherboardSelected.forEach(element => {
                // Filtrando motherboards por tipo de socket para la compatibilidad con el procesador
                if (element.socket === processors[keysProcessors[userProcessor]][userProcessorFinal].socket) {
                    motherboardsCompatibles.push(element);
                }
            });
            motherboardsCompatibles.forEach(element => {
                resultado += `${motherboardsCompatibles.indexOf(element) + 1} - ${element.name} - ${localMoneda} ${element.finalPrice()}\n`;
            });
            let userMotherboardTemp = parseInt(prompt(`Tenemos disponible: ${resultado}`)) - 1;
            if (motherboardsCompatibles[userMotherboardTemp] !== undefined) {
                // Agregando la motherboard al carrito
                carrito.push(motherboardsCompatibles[userMotherboardTemp])
                userMotherboardFinal = motherboardsCompatibles[userMotherboardTemp]
                step++;
            } else {
                alert("El valor ingresado es inválido.");
            }
            break;
    }
}
function CalcularTotal(){
    let costoTotal = carrito.reduce((obj1,obj2)=>obj1 + obj2.finalPrice(), 0)
    return costoTotal;
}
mensaje = `Usted ha elegido:
Procesador: ${carrito[0].name.toUpperCase()} de la marca ${carrito[0].brand.toUpperCase()}, este producto tiene un costo de: ${localMoneda} ${carrito[0].finalPrice()}
Motherboard ${carrito[1].name.toUpperCase()} de la marca ${carrito[1].brand.toUpperCase()}, este producto tiene un costo de: ${localMoneda} ${carrito[1].finalPrice()}
El costo total de los productos es: ${localMoneda} ${CalcularTotal()}`
alert(mensaje)