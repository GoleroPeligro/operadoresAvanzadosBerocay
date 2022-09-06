
const productos = [];
const carrito = [];

let visto = false;
let carVisto = false;
let index = 0;


let precioTotal = 0;


//Creo la clase Producto
class Producto {
    constructor(nombre, precio, detalle, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.detalle = detalle;
        this.id = id;
    }
}

//Creacion de productos y pushado en el array
const prod1 = new Producto("Reproductor de MP3", 350, "Capacidad 512 Mb", index++);
const prod2 = new Producto("Agenda electronica", 600, "Capacidad 64kb, Agenda, calculadora, calendario,", index++);
const prod3 = new Producto("Celular Nokia 1100", 550, "Llamadas, mensajes de texto, juego de la viborita", index++);
const prod4 = new Producto("Reproductor de VHS", 730, "Reproduce y graba, autotracking", index++);

productos.push(prod1, prod2, prod3, prod4);

//DOM
//--Nombre usuario
let header = document.getElementById('saludo');
let nomDiv = document.getElementById('nom-div');
let blurDiv = document.getElementById('blur-div');
let nomUsuario = document.getElementById('nom-usuario');
let formNom = document.getElementById('form-nom');

//--Form agregar productos
let form = document.getElementById('formulario');
let btnAgregar = document.getElementById('btn-add');
let agregarProd = document.getElementById('add-prod');

//--Ver productos
let btnVer = document.getElementById('btn-ver');
let mostrarProd = document.getElementById('ver-prod');
let inputNom = document.getElementById('inom');

//--Ver carrito
let verCarrito = document.getElementById('carrito');
let btnCarrito = document.getElementById('btn-carrito');


let usuario = localStorage.getItem('nombre');


if (usuario == null || usuario =="" || usuario == undefined){
    
    blurDiv.style.visibility = 'visible';
    nomDiv.style.visibility = 'visible';
    nomUsuario.focus();
    formNom.onsubmit = pedirNombre;

}else{
    header.innerHTML = `<p class="saludo">Bienvenido/a <strong>${usuario}</strong></p>`;
}
//CAPTURAR DATOS

let iNombre = form.children[0].value;
let iPrecio = form.children[1].value;
let iDetalle = form.children[2].value;

inputNom.focus();

//FUNCIONES

function pedirNombre(){
    usuario = nomUsuario.value; 
    if(usuario !== ""){
        localStorage.setItem('nombre', usuario);
        blurDiv.style.visibility = 'hidden';
        nomDiv.style.visibility = 'hidden';
        header.innerHTML = `<p class="saludo">Bienvenido/a <strong>${usuario}</strong></p>`;   
        inputNom.focus(); 
    }
    
   
}

const validarDatos = () => {
    iNombre = form.children[0].value;
    iPrecio = form.children[1].value;
    iDetalle = form.children[2].value;
    

    if (iNombre == '' || iPrecio == '' || iDetalle == '') {
        alert("Error debe completar todos los campos para continuar")
        bandera = false;
    } else {
        bandera = true;
    }
}

const agregarDatos = (e) => {
    e.preventDefault();
    validarDatos();
    borrarProd();
    if (bandera === true) {

        let datos = e.target;

        productos.push(new Producto(iNombre, Number(iPrecio), iDetalle, index));

        datos.children[0].value = "";
        datos.children[1].value = "";
        datos.children[2].value = "";
        inputNom.focus();
        index++;
    }
}

const mostrarAdd = () => {

    if (agregarProd.style.visibility == 'hidden') {
        agregarProd.style.visibility = 'visible';
        mostrarProd.style.visibility = 'hidden';
        verCarrito.style.visibility = 'hidden';
        verCarrito.innerHTML = '';
        precioTotal = 0;
    } else {
        agregarProd.style.visibility = 'hidden';
    }
}

const verProd = () => {
    agregarProd.style.visibility = 'hidden';
    mostrarProd.style.visibility = 'visible';
    verCarrito.style.visibility = 'hidden';
    verCarrito.innerHTML = '';
    precioTotal = 0;

    if (visto === false) {
        for (const info of productos) {
            let infoProd = `<strong>Nombre:</strong> ${info.nombre}<br> <strong>Precio:</strong> $${info.precio}<br> <strong>Detalle:</strong> ${info.detalle}`

            let divProd = document.createElement('div');
            let pProd = document.createElement('p');
            let btnComprar = document.createElement('button');

            divProd.className = 'div-prod';
            btnComprar.type = 'button';
            btnComprar.className = 'btn-comprar'
            btnComprar.innerHTML = "Agregar al carrito";
            pProd.innerHTML = infoProd;

            mostrarProd.appendChild(divProd);
            divProd.appendChild(pProd);
            divProd.appendChild(btnComprar);
        
            btnComprar.onclick = ()=>{
                carrito.push({nombre : info.nombre, precio : info.precio, id : info.id});
                btnCarrito.innerHTML = `Carrito (${carrito.length})`;
            }
            visto = true;

        }

        
    }
   
   
}

const mostrarCarrito = ()=>{
    precioTotal = 0;
    agregarProd.style.visibility = 'hidden';
    mostrarProd.style.visibility = 'collapse';
    verCarrito.style.visibility = 'visible';

    verCarrito.innerHTML = "<h2>Carrito de compras</h2>"
    if (carVisto === false) {
        for (const datos of carrito) {
            

            const {nombre, precio, id} = datos;//destructuración del objeto
            
            let prodCar = `<p>${nombre}: $${precio}</p><br>`;

            let divProdCar = document.createElement('div');
            let pCar = document.createElement('p');
           

            divProdCar.className = 'div-prod-car';
            divProdCar.id = `${datos.id}`;
            pCar.innerHTML = prodCar;
           

            verCarrito.appendChild(divProdCar);
            divProdCar.appendChild(pCar);
         
           


            precioTotal += precio;

           

        }
       
        
    }

    verCarrito.innerHTML += `<hr><p><br><strong>Precio Total:</strong> $${precioTotal}</p>`
    let btnComprar = document.createElement('button');
    btnComprar.id = "btn-comprar";
    btnComprar.className = "btnComprar"
    btnComprar.innerHTML = "Comprar";
    verCarrito.appendChild(btnComprar);

    btnComprar.onclick = () => {

        (carrito.length > 0) ? (confirm("desea continuar con su compra") ? alert("Gracias por su compra"): false ) : alert ("El carrito esta vacio")//OPERADOR TERNARIO
  
    }

}



//EVENTOS
btnAgregar.onclick = mostrarAdd;

btnVer.onclick = verProd;

form.onsubmit = agregarDatos;

btnCarrito.onclick = mostrarCarrito;




