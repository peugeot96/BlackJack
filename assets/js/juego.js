/* 
2c = 2 de clubs
2D = 2 de diaminds
2H = 2 de hearts
2S = 2 de spades
*/

let deck = [];
const tipos = ["C","D","H","S"]

const especiales = ["A","J","K","Q"]

let puntosJugador = 0

let puntosCompucador = 0


//referencias

const pedir = document.getElementById("btnPedir")

const nuevoJuevo = document.querySelector("#btnNuevo")

const detener = document.getElementById("btnDetener")

let sumar = document.querySelector("#sumaJugador") 

let sumarcpu = document.querySelector("#sumarComputadora")

const cartasJugador = document.querySelector(`#jugador-cartas`)
const cartasCompucadora = document.querySelector("#compucatora-cartas")

console.log(sumar)
console.log(sumarcpu)


const crearDeck = ()=>{

    for (let i = 2; i <= 10; i++)
      
        for (const tipo of tipos) {
            
            deck.push(i + tipo)

        }

        for (const tipo of tipos) {
            
            for (const esp of especiales) {
                
                deck.push(esp + tipo)
            }
        }
    
    deck = _.shuffle(deck)

    
    
    // console.log(deck)
}

crearDeck()


//PEDIR CARTA


const pedirCarta =() =>{

      if (deck.length === 0) {
            throw "no hay cartas en el deck"  
      } 

      const carta = deck.shift()
    return carta
      
}


pedirCarta()


//valor de cartas

const valorCarta = (carta)=>{

    const valor = carta.substring(0, carta.length - 1   )
      
    return (isNaN(valor)) ? 
                (valor==="A") ? 11:10
                :(valor*1)

    
}


//turno de la cpu 

const turnoCpu = (puntosMinimos)=>{

    do {
        let carta = pedirCarta();
   
        puntosCompucador = puntosCompucador + valorCarta(carta)
    
        sumarcpu.innerHTML = puntosCompucador
    
        const imgCarta = document.createElement(`img`)
    
        imgCarta.src = `assets/cartas/${carta}.png`
     
        imgCarta.classList.add("cartas")
        cartasCompucadora.append(imgCarta)

        if(puntosMinimos>21){
            break;
        }

    } while ((puntosCompucador<puntosMinimos) && (puntosMinimos<= 21) );


    setTimeout(() => {
        
        if(puntosCompucador===puntosMinimos){
            alert("nadie gana")
        }else if(puntosMinimos >21){
            alert("Computadora gana")
        }else if (puntosCompucador>21){
            alert("Ganaste")
        }else if (puntosCompucador>puntosJugador){
            alert("Computadora gana")
        }
    }, 1000);

}


//eventos


pedir.addEventListener(`click`, ()=>{

   let carta = pedirCarta();
   
    puntosJugador = puntosJugador + valorCarta(carta)

    sumar.innerHTML = puntosJugador

    const imgCarta = document.createElement(`img`)

    imgCarta.src = `assets/cartas/${carta}.png`
 
    imgCarta.classList.add("cartas")
    cartasJugador.append(imgCarta)
    
    if (puntosJugador>21){
        alert("perdiste")
        pedir.disabled = true
        detener.disabled = true
        turnoCpu(puntosJugador)
    }else if (puntosJugador===21){
        alert("ganaste")
        pedir.disabled= true
        detener.disabled = true
        turnoCpu(puntosJugador)
    }

} )


//evento detener 

detener.addEventListener("click", ()=>{

    pedir.disabled = true
    detener.disabled = true

    turnoCpu(puntosJugador)

   
    

})

//evento nuevo juego

nuevoJuevo.addEventListener("click",()=>{

    deck= []

   decknuevo =  crearDeck()


   puntosJugador = 0;
   puntosCompucador = 0;

   sumarcpu.innerHTML = 0
   sumar.innerHTML = 0
   
   

   cartasCompucadora.innerHTML = "";
   cartasJugador.innerHTML = "";

   pedir.disabled = false
   detener.disabled = false


})

