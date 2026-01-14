
const _URL_ENDPOINT = "https://pokeapi.co/api/v2";


export async function getPokemons() {
    try{
        let response = await fetch(`${_URL_ENDPOINT}/pokemon`)
        if (!response.ok){
            throw new Error("Fallo al llamar a la api: ", response.status)
        } 
        
        let pokemons = response.json()
        return pokemons;
    } catch(error){
        throw new Error(`ERROR AL REALIZAR LA LLAMADA`)
    }
}

export async function getToApiWithUrl(params) {
    try{
        let response = await fetch(`${_URL_ENDPOINT}/${params}`)
        if (!response.ok){
            throw new Error("Fallo al llamar a la api: ", response.status)
        } 
        return response.json()
    } catch(error){
        throw new Error(`ERROR AL REALIZAR LA LLAMADA`)
    }
}

export async function getPokemonsByUrl(url_tipo) {
    try{
        let response = await fetch(`${url_tipo}`)
        if (!response.ok){
            throw new Error("Fallo al llamar a la api: ", response.status)
        } 
        
        let pokemons = response.json()
        return pokemons;
    } catch(error){
        throw new Error(`ERROR AL REALIZAR LA LLAMADA`)
    }
}


export async function peticionConReintentos(url, intentos){
    for(let i = 0; i<intentos; i++){
        try{
            let response = await fetch(url)

            if (!response.ok){
                throw new Error(`ERROR HTTP: ${response.status}`)
            } 

            return response.json()
        }catch(error){
            console.log(`Intento numero ${i+1} fallido`);

            if ((i+1) === intentos){
                throw new Error('Se agotaron los intentos')
            } 

            await new Promise(resolve => setTimeout(resolve, 10))
        }
    }
}
