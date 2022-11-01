const carrito= []
let totalCarrito;
let contenedor = document.getElementById("misprods");


function renderizarProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
        <div class="card col-sm-3">
        <img src=${producto.foto} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-text">${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
            <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
        </div>
        </div>
        `;
    }

    productos.forEach(producto => {
            document.getElementById(`btn${producto.id}`).addEventListener("click", function(){
                agregarAlCarrito(producto);
                const guardarLocal =(clave, valor) => {localStorage.setItem(clave,valor) };
                guardarLocal(producto.id, JSON.stringify(producto));
            });
            localStorage.clear();
        })
}

renderizarProds();

const guardarLocal =(clave, valor) => {localStorage.setItem(clave,valor) };
guardarLocal("lista de productos", JSON.stringify(productos));
let carritoenLS = JSON.stringify(localstorage.getItem(carrito))
if(carritoenLS){
carrito = carritoenLS
}
renderCarrito(carrito)

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito);
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.id}</td>
            <td>${productoComprado.nombre}</td>
            <td>${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;

    let infoiva = document.getElementById("iva");
    infoiva.innerText="Iva Total:" +parseFloat((totalCarrito*21)/100);

    let infototalmasiva = document.getElementById("totalmasiva");
    infototalmasiva.innerText="Total a pagar $: "+parseFloat(totalCarrito*1.21);
    localStorage.removeItem(carrito);
}



