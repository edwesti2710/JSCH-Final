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
let userProcessor, userProcessorFinal, userMotherboard, userMotherboardFinal, motherboardsCompatibles;
let carrito = [];
// Enlistando los procesadores que hay
let keysMotherboards;
let keysProcessors;

drawOptions();

// Dibujar opciones
function drawOptions() {
    let resultado = ``
    switch (step) {
        // Seleccione la marca de procesador
        case 1:
            keysProcessors = Object.keys(processors);
            for (let i = 0; i < keysProcessors.length; i++) {
                resultado += `<option value="${i}">${keysProcessors[i].toUpperCase()}</option>`;
            }
            let brandsProcessor = document.getElementById('step1');
            brandsProcessor.innerHTML = `<label for="brandProcessor">Seleccione la marca que prefiere:</label>
            <select name="brandProcessor" id="brandProcessor">
                ${resultado}
            </select>
            <button type="submit" id="buttonBrandProcessor">Aceptar</button>`;
            let buttonBrandProcessor = document.getElementById('buttonBrandProcessor');
            buttonBrandProcessor.onclick = (e) => {
                e.preventDefault(); // prevent
                sendData()
            }
            break;
        // Seleccione la el modelo de procesador
        case 2:
            // Analizando por el procesador que eligio el usuario
            let processorsSelected = processors[keysProcessors[userProcessor]];
            processorsSelected.forEach(element => {
                resultado += `<option value="${processorsSelected.indexOf(element)}">${element.name} - ${localMoneda} ${element.finalPrice()}</option>`
            });

            let processorHtml = document.getElementById('step2');
            processorHtml.innerHTML = `<label for="processor">Seleccione el procesador:</label>
            <select name="processor" id="processor">
            ${resultado}
            </select><button type="submit" id="buttonProcessor">Aceptar</button>`

            let buttonProcessor = document.getElementById('buttonProcessor');
            buttonProcessor.onclick = (e) => {
                e.preventDefault(); // prevent
                sendData()
            }
            break;
        // Seleccione la marca de Motherboards
        case 3:
            keysMotherboards = Object.keys(motherboards);
            for (let i = 0; i < keysMotherboards.length; i++) {
                resultado += `<option value="${i}">${keysMotherboards[i].toUpperCase()}</option>`;
            }
            let motherboardBrandHtml = document.getElementById('step3');
            motherboardBrandHtml.innerHTML = `<label for="brandMotherboard">Seleccione la marca de motherboard que prefiere:</label>
            <select name="brandMotherboard" id="brandMotherboard">
                ${resultado}
            </select>
            <button type="submit" id="buttonMotherboardBrand">Aceptar</button>`

            let buttonMotherboardBrand = document.getElementById('buttonMotherboardBrand');
            buttonMotherboardBrand.onclick = (e) => {
                e.preventDefault(); // prevent
                sendData()
            }
            break;
        // Seleccione la el modelo de motherboard
        case 4:
            // Analizando por la motherboard que eligio el usuario
            let motherboardSelected = motherboards[keysMotherboards[userMotherboard]];
            motherboardsCompatibles = [];
            motherboardSelected.forEach(element => {
                // Filtrando motherboards por tipo de socket para la compatibilidad con el procesador
                motherboardsCompatibles = motherboardSelected.filter(obj => obj.socket === processors[keysProcessors[userProcessor]][userProcessorFinal].socket);
            });
            motherboardsCompatibles.forEach(element => {
                resultado += `<option value="${motherboardsCompatibles.indexOf(element)}">${element.name} - ${localMoneda} ${element.finalPrice()}</option>`;
            });

            let motherboardHtml = document.getElementById('step4');
            motherboardHtml.innerHTML = `<label for="motherboard">Seleccione la marca que prefiere:</label>
            <select name="motherboard" id="motherboard">
                ${resultado}
            </select>
            <button type="submit" id="buttonMotherboard">Aceptar</button>`

            let buttonMotherboard = document.getElementById('buttonMotherboard');
            buttonMotherboard.onclick = (e) => {
                e.preventDefault(); // prevent
                sendData()
            }
            break;
    }
}

function sendData() {
    switch (step) {
        // Seleccione la marca de procesador
        case 1:
            let brandProcessor = document.getElementById('brandProcessor');
            userProcessor = brandProcessor.value;
            step++;
            document.getElementById('step1').remove()
            drawOptions();
            break;
        // Seleccione la el modelo de procesador
        case 2:
            let processor = document.getElementById('processor');
            userProcessorFinal = processor.value;
            // Agregando el procesador al carrito
            carrito.push(processors[keysProcessors[userProcessor]][userProcessorFinal])
            step++;
            document.getElementById('step2').remove()
            drawOptions();
            break;
        // Seleccione la marca de Motherboards
        case 3:
            let brandMotherboard = document.getElementById('brandMotherboard');
            userMotherboard = brandMotherboard.value;
            step++;
            document.getElementById('step3').remove()
            drawOptions();
            break;

        // Seleccione la el modelo de motherboard
        case 4:
            let motherboard = document.getElementById('motherboard');
            userMotherboardTemp = motherboard.value;
            carrito.push(motherboardsCompatibles[userMotherboardTemp])
            userMotherboardFinal = motherboardsCompatibles[userMotherboardTemp]
            step++;
            document.getElementById('step4').remove()
            drawResult();
            // Mostrar Objetos ocultos 
            document.getElementById("result").style.display = "block";
            break;
    }
}
function CalcularTotal() {
    let costoTotal = carrito.reduce((obj1, obj2) => obj1 + obj2.finalPrice(), 0)
    return costoTotal;
}


function drawResult() {
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
}

// Desaparecer objetos innecesarios
document.getElementById("result").style.display = "none";

// Funciones Generales
function recargarPagina() {
    location.reload();
}