const contenidoTienda= document.getElementById("tiendaContenido");
const verCarrito = document.getElementById("ver-carro");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito")
 

let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
let productos = []
const getProductos = async() =>{
    const response = await fetch("JSON/products.json");
    const data = await response.json();
    productos=data;
    displayProductos()
};

getProductos();
const displayProductos=()=>{
    contenidoTienda.innerHTML=``;

//app
productos.forEach ((product)=>{
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
    
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="valor">$${product.precio}</p>
        
    
    
   `
   contenidoTienda.append(contenido);
   let botton = document.createElement("button")
   botton.innerText = "Pedir";
   botton.className = "pedir";
    
   contenido.append(botton);

   botton.addEventListener('click', ()=>{
    const repeat = carrito.some((repeatProduct) =>repeatProduct.id===product.id);

    if (repeat){
        carrito.map((prod)=>{
            if(prod.id === product.id){
                prod.cantidad++
            }
        })
    }else{
        carrito.push({
            id : product.id,
            img: product.img,
            nombre : product.nombre,
            precio : product.precio,
            cantidad : product.cantidad,
        });
        carritoContador();
        local();
    
        };
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego correctamente al carrito',
            showConfirmButton: false,
            timer: 1500
          })
    });

});
}
const local = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));



//carrito
const verCarro = () =>{
        modalContainer.innerHTML= ``;
        modalContainer.style.display = "flex";
        const modalHeader= document.createElement("div");
        modalHeader.className = "modal-header";
        modalHeader.innerHTML = `
            <h1 class="modal-header-titulo">Carrito</h1>
        `;
        modalContainer.append(modalHeader);
    
        const modalbutton= document.createElement("h1");
        modalbutton.innerText = "X";
        modalbutton.className = "modal-header-button";
    
        modalbutton.addEventListener("click", ()=>{
            modalContainer.style.display = "none";
        });
    
    
        modalHeader.append(modalbutton);
        
      
        carrito.forEach((product )=>{
            let carritoContenido = document.createElement("div");
            carritoContenido.className = "modal-contenido";
            carritoContenido.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="eliminar-producto"> ❌ </span>
            
        `;
            modalContainer.append(carritoContenido);

            const sumar = carritoContenido.querySelector(".sumar");

            sumar.addEventListener("click", ()=>{
                product.cantidad++;
                local()
                verCarro()
            })
            const restar = carritoContenido.querySelector(".restar");
            restar.addEventListener("click", ()=>{
                if(product.cantidad !== 0){
                    product.cantidad--
                }
                if(product.cantidad === 0){
                    eliminarProd()
                }
                local()
                verCarro();
            })
            const borrar = carritoContenido.querySelector(".eliminar-producto");
            borrar.addEventListener("click", ()=>{
                eliminarProd(product.id);

            })
            
        });



    
        const total = carrito.reduce((acc, el) => acc+ el.precio * el.cantidad, 0);
    
        const totalCompra = document.createElement("div");
        totalCompra.className="totalComprado";
        totalCompra.innerHTML = `total a pagar: ${total}`;
        modalContainer.append(totalCompra);
    
        
}


verCarrito.addEventListener("click",verCarro);

const eliminarProd = (id) => {
    const encontrarId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== encontrarId;
    })
    carritoContador();
    local();
    verCarro();
};
const carritoContador = () =>{
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

}
carritoContador();