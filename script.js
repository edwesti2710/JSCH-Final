// Variables Globales
const valorDolar = 4;
let ganancia = 1.1;
let step = 1;
let localMoneda = 'S/.'

// Constructor de Productos
class Product {
    constructor(name, socket, brand, img, price0) {
        this.name = name;
        this.socket = socket;
        this.brand = brand;
        this.img = img;
        this.price0 = price0;
        this.finalPrice = function () { return Math.round((this.price0 * valorDolar) * ganancia); };
    }
}

const asus = [
    { name: 'ASUS PRIME A320M-K', socket: 'AM4', brand: 'asus', img: 'https://www.asus.com/media/global/products/KRyCoH4XfPYSg5da/P_setting_xxx_0_90_end_500.png', price0: 50, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS PRIME B450M-A', socket: 'AM4', brand: 'asus', img: 'https://www.asus.com/media/global/products/Mh7JcLMTVjDCnQbz/P_setting_xxx_0_90_end_500.png', price0: 70, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS PRIME B460M-A', socket: 'LGA1200', brand: 'asus', img: 'https://www.asus.com/media/global/products/sfalkfod5w5uqkjk/P_setting_xxx_0_90_end_500.png', price0: 60, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'ASUS PRIME H410M-E', socket: 'LGA1200', brand: 'asus', img: 'https://www.asus.com/media/global/products/s2i96l2bqhnw1mhz/P_setting_xxx_0_90_end_500.png', price0: 45, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]

const gigabyte = [
    { name: 'A320M-S2H', socket: 'AM4', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/c9d47f21dec878e822db72d94922ee27/Product/20983/png/500', price0: 45, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'B450M DS3H', socket: 'AM4', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/035cd59de1ee82f0105e4633da728352/Product/21100/png/500', price0: 55, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'B460M DS3H V2', socket: 'LGA1200', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/c40c2736695f2128f767e2db209cacfa/Product/27255/png/500', price0: 50, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'H410M H', socket: 'LGA1200', brand: 'gigabyte', img: 'https://static.gigabyte.com/StaticFile/Image/Global/e24671ffd4e1db2b626ea6977d254e17/Product/25114/png/500', price0: 40, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]
const motherboards = {
    asus, gigabyte
}

const amd = [
    { name: 'Ryzen 3 3200g', socket: 'AM4', brand: 'amd', img: 'https://www.amd.com/system/files/styles/992px/private/2019-06/238593-ryzen-3-vega-pib-left-facing-1260x709_0.png?itok=o-efjbjS', price0: 99, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'Ryzen 5 3400g', socket: 'AM4', brand: 'amd', img: 'https://www.amd.com/system/files/styles/992px/private/2019-07/238593-ryzen-5G-pib-right-facing-1260x709.png?itok=0seLB30Y', price0: 159, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
]
const intel = [
    { name: 'Core i3 10100F', socket: 'LGA1200', brand: 'intel', img: 'https://www.intel.com/content/dam/products/hero/foreground/badge-10th-gen-core-i3-1x1.png', price0: 119, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
    { name: 'Core i5 10400F', socket: 'LGA1200', brand: 'intel', img: 'https://www.intel.com/content/dam/products/hero/foreground/badge-10th-gen-core-i5-1x1.png', price0: 169, finalPrice() { return Math.round((this.price0 * valorDolar) * ganancia); } },
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
            let imgProcessorBrand = '';
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
                motherboardsCompatibles = motherboardSelected.filter(obj => obj.socket === processors[keysProcessors[userProcessor]][userProcessorFinal].socket);
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
function CalcularTotal() {
    let costoTotal = carrito.reduce((obj1, obj2) => obj1 + obj2.finalPrice(), 0)
    return costoTotal;
}

// Dibujando elementos en la web
// ProcessorBrand
let processorBrand = document.querySelector('.processorBrand')
processorBrand.innerHTML = `<article class="item">
<div class="imgContainer">
    <img src="./assets/img/${carrito[0].brand.toUpperCase()}_Logo.svg" alt="${carrito[0].brand} Logo">
</div>
</article>`
// Processor
let processor = document.querySelector('.processor')
processor.innerHTML = `<article class="item">
<div class="imgContainer">
    <img
        src="${carrito[0].img}" alt="${carrito[0].name}">
</div>
<div class="data">
    <h3>${carrito[0].name}</h3>
    <h3>${localMoneda} ${carrito[0].finalPrice()}</h3>
</div>
</article>`
// MotherboardBrand
let motherboardBrand = document.querySelector('.motherboardBrand')
motherboardBrand.innerHTML = `<article class="item">
<div class="imgContainer">
    <img src="./assets/img/${carrito[1].brand.toUpperCase()}_Logo.svg" alt="${carrito[1].brand} Logo">
</div>
</article>`
// Motherboard
let motherboard = document.querySelector('.motherboard')
motherboard.innerHTML = `<article class="item">
<div class="imgContainer">
<img
src="${carrito[1].img}" alt="${carrito[1].name}">
</div>
<div class="data">
    <h3>${carrito[1].name}</h3>
    <h3>${localMoneda} ${carrito[1].finalPrice()}</h3>
</div>
</article>`
// TOTAL
let total = document.querySelector('.total')
total.innerHTML = `<h3>TOTAL: ${localMoneda} ${CalcularTotal()}</h3>`


// Funciones Generales
function recargarPagina(){
    location.reload();
}