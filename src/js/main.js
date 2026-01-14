import *  as api_service from './service/api_service.js'
import * as utils from './utils/utils.js'

let divEjercicios = document.getElementById("ejercicios");
let divContainer = document.getElementById("contenido")

let btnCargarDatos = document.getElementById("btnCargarDatos")

let pokemons

btnCargarDatos.addEventListener("click" , () => cargarDatos())

async function cargarDatos(){
    try{
        let response = await api_service.getPokemons()
        pokemons = response.results
        
    }catch(error){
        console.error(error.message)
    }

    generarBotonesPregunta()
}

function generarBotonesPregunta(){
    let divMenu = document.getElementById("menu");
    divMenu.innerHTML = ""
    let btn;
    //Ejer 1
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer1";
    btn.textContent = "Generar selector de tipos";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
    //Ejer 2
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer2";
    btn.textContent = "Generar buscador por nombre";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
    //Ejer 3
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer3";
    btn.textContent = "Mostrar mayor y menor peso";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
    //Ejer 4
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer4";
    btn.textContent = "Mostrar 2 tipos";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
    //Ejer 5
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer5";
    btn.textContent = "Probar petición varias veces";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
    //Ejer 6
    /*
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btnEjer6";
    btn.textContent = "Carga Secuencial";
    btn.className = "p-0.5 m-1 border-2 text-sm bg-gray-300 rounded-lg";
    divMenu.appendChild(btn)
 */
    //Escuchadores
    const btnEjer1 = document.getElementById("btnEjer1")
    btnEjer1.addEventListener("click", () => generarSelectorTipos())
    const btnEjer2 = document.getElementById("btnEjer2")
    btnEjer2.addEventListener("click", () => generarInputBusqueda())
    const btnEjer3 = document.getElementById("btnEjer3")
    btnEjer3.addEventListener("click", () => MostrarMayorYMenorPeso())
    const btnEjer4 = document.getElementById("btnEjer4")
    btnEjer4.addEventListener("click", () => Mostrar2tipos())
    const btnEjer5 = document.getElementById("btnEjer5")
    btnEjer5.addEventListener("click", () => peticionConReintentos('uls',3))
    /*const btnEjer6 = document.getElementById("btnEjer6")
    btnEjer6.addEventListener("click", () => cargarSecuencialmente())*/

}

async function generarSelectorTipos(){
    let tipos = new Set()
    let results
    try{
        let data = await api_service.getToApiWithUrl("type")
        results = data.results
        for (const tipo of results) {
            tipos.add(tipo)
        }
        
    
        let select = document.createElement("select");
        select.id = "selectCategorias"
        for (const tipo of tipos) {
            let option = document.createElement("option")
            option.text = tipo.name
            option.value = tipo.url
            select.appendChild(option)
        }
        divEjercicios.innerHTML = "Seleccione una categoria <br>"
        divEjercicios.appendChild(select)
        select.addEventListener("change", ($event) => pintaPorTipos($event.target.value))

    }catch(error){
        console.log(error.message)
    }

    
}

function generarInputBusqueda(){
    
    divEjercicios.innerHTML = ""
    let input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Introduce el nombre del producto"
    input.className = "w-full p-2 border-0.5 border rounded-2xl"
    divEjercicios.appendChild(input)
    input.addEventListener("change", ($event) => pintarPorNombre(pokemons, $event.target.value))
}

async function pintaPorTipos(url_tipo) {
    console.log(url_tipo)
    try{
        let data = await api_service.getPokemonsByUrl(url_tipo)
        pokemons = data.pokemon
        
        divContainer.innerHTML = ""
        let table = document.createElement("table")
        let thead = generarCabeceraTabla()   
        let tbody = document.createElement("tbody")
        for (const poke of pokemons) {
            let datosPokemon = await api_service.getPokemonsByUrl(poke.pokemon.url)
            let tr = generarFilaProducto(datosPokemon)
            tbody.appendChild(tr)
        }

        table.appendChild(thead)
        table.appendChild(tbody)
        divContainer.appendChild(table)
    }catch(error){
        console.log(error.message)
    }
    
}

async function pintarPorNombre(pokemons, inputNombre){
    divContainer.innerHTML = ""
    let copiaPokemon = [...pokemons]
    let table = document.createElement("table")
    let thead = generarCabeceraTabla()   
    let tbody = document.createElement("tbody")
    
    for (const pokemon of copiaPokemon) {
        if (pokemon.pokemon.name.includes(inputNombre)){
            let poke = await api_service.getPokemonsByUrl(pokemon.pokemon.url)
            console.log(poke)
            let tr = generarFilaProducto(poke)
            tbody.appendChild(tr)
        }
    }

    table.appendChild(thead)
    table.appendChild(tbody)
    divContainer.appendChild(table)
}

function generarFilaProducto(pokemon){
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    td.textContent = pokemon.id
    tr.appendChild(td)
    td = document.createElement("td")
    td.textContent = pokemon.name
    tr.appendChild(td)
    td = document.createElement("td")
    td.textContent = pokemon.types[0].type.name
    tr.appendChild(td)
    td = document.createElement("td")
    td.textContent = (pokemon.types[1] != null ? pokemon.types[1].type.name : "none")
    tr.appendChild(td)
    td = document.createElement("td")
    td.textContent = (pokemon.weight)
    tr.appendChild(td)
    td = document.createElement("td")
    td.textContent = (pokemon.height)
    tr.appendChild(td)
    return tr
}

function generarCabeceraTabla(){
    let thead = document.createElement("thead")
    let cabecera = document.createElement("tr")
    let th = document.createElement("th")
    th.textContent = "Pokedex#"
    cabecera.appendChild(th)
    th = document.createElement("th")
    th.textContent = "Nombre"
    cabecera.appendChild(th)
    th = document.createElement("th")
    th.textContent = "tipo(1)"
    cabecera.appendChild(th)
    th = document.createElement("th")
    th.textContent = "tipo(2)"
    cabecera.appendChild(th)
    th = document.createElement("th")
    th.textContent = "peso"
    cabecera.appendChild(th)
    th = document.createElement("th")
    th.textContent = "altura"
    cabecera.appendChild(th)
    thead.appendChild(cabecera)
    return thead
}

async function MostrarMayorYMenorPeso(){
    let copiaPokemons = []
    for (const pokemon of pokemons) {
        
        let data = await api_service.getPokemonsByUrl(pokemon.pokemon.url)
        copiaPokemons.push(data)
    }
    let productoMayorPrecio = copiaPokemons.reduce((max, p) => p.weight > max.weight ? p : max, copiaPokemons[0])
    let productoMenorPrecio = copiaPokemons.reduce((min, p) => p.weight < min.weight ? p : min, copiaPokemons[0])

    let productoMostrados = [productoMayorPrecio, productoMenorPrecio]

    divContainer.innerHTML = ""
    let table = document.createElement("table")
    let thead = generarCabeceraTabla()   
    let tbody = document.createElement("tbody")
    
    for (const producto of productoMostrados) {
        
        let tr = generarFilaProducto(producto)
        tbody.appendChild(tr)
        
    }

    table.appendChild(thead)
    table.appendChild(tbody)
    divContainer.appendChild(table)

}

async function Mostrar2tipos() {
    const inicio = performance.now();
    let [pokemonTipo1, pokemonTipo2] = await Promise.all([await api_service.getPokemonsByUrl('https://pokeapi.co/api/v2/type/10/'), 
        await api_service.getPokemonsByUrl("https://pokeapi.co/api/v2/type/11/")])
     const fin = performance.now();

     let pokemonsMostrar = [...pokemonTipo1.pokemon, ...pokemonTipo2.pokemon]
     console.log(pokemonsMostrar)
    let total = pokemonsMostrar.length
    utils.mostrarMensaje(`El numero total de productos es de ${total}`, 'info')
    console.log(`Las peticiones han tardado en total ${fin-inicio} milisegundos`)
    console.log(`Total de productos ${total}`)
    divContainer.innerHTML = ""
    let table = document.createElement("table")
    let thead = generarCabeceraTabla()   
    let tbody = document.createElement("tbody")
    
    for (const pokemon of pokemonsMostrar) {
        let poke = await api_service.getPokemonsByUrl(pokemon.pokemon.url)
        let tr = generarFilaProducto(poke)
        tbody.appendChild(tr)
        
    }

    table.appendChild(thead)
    table.appendChild(tbody)
    divContainer.appendChild(table) 

}

async function peticionConReintentos(url, intentos = 3){
    let pokemones = []
    try{
        pokemones = await api_service.peticionConReintentos(url, intentos)
        divContainer.innerHTML = '<h3 class="text-xl">Han llegado los datos</h3>'
    }catch(error){
        utils.mostrarMensaje(error.message, 'error')
    }
}