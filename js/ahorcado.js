var muñecoAhorcado = ["cabeza","cuerpo","brazoDerecho","brazoIzquierdo","piernaDerecha","piernaIzquierda"]
var diccionario = ["perro","gato","piedra","papel","tijera","caballo","elefante","lampara","luz"]
var palabraArray = []
var palabraMostrar = []
var letrasEquivocadas = []
var letraPulsada = [] 
var juegoIniciado = false


var botonIniciar = document.querySelector("#iniciar-juego");
botonIniciar.addEventListener("click",function(){    
   muñecoAhorcado = ["cabeza","cuerpo","brazoDerecho","brazoIzquierdo","piernaDerecha","piernaIzquierda"]
    
    if (localStorage.getItem("diccionario") == null){
        localStorage.setItem("diccionario",diccionario)
    }
    else{
        diccionario = localStorage.getItem("diccionario").split(",")        
    }

    palabraArray = Array.from((diccionario[Math.floor(Math.random() * (diccionario.length))]).toUpperCase());
    palabraMostrar = Array.from("_".repeat(palabraArray.length));
    letrasEquivocadas = [];
    letraPulsada = [];
    iniciarTablero();
    escribirPalabraSecreta(palabraMostrar.join(" "));
    escribirLetra(letrasEquivocadas.join(" "));
    juegoIniciado = true;
    habilitarDeshabilitarInput(true)    
});


var botonAgregar = document.querySelector("#nueva-palabra");
botonAgregar.addEventListener("click",function(){
    var inputPalabra = document.querySelector('#input-nueva-palabra');
    var palabra = inputPalabra.value;
    var patt = /^[a-z\s]+$/g;    

    if (patt.test(palabra)){
        diccionario.push(palabra);
        inputPalabra.value = "";
        localStorage.setItem("diccionario",diccionario)
    }

console.log(diccionario)
})

function habilitarDeshabilitarInput(habilitarDeshabilitar){
    var inputPalabra = document.querySelector('#input-nueva-palabra');
    inputPalabra.disabled = habilitarDeshabilitar
}


function controlaLetra(letra){
    var patt = /^[A-Z\s]+$/g;
    letra = letra.toUpperCase()     

    if (!letraPulsada.includes(letra) && patt.test(letra) ){
        letraPulsada.push(letra)
        var advino = false;
        for(indice = 0 ; indice<palabraArray.length; indice++){        
                if (palabraArray[indice] == letra){            
                    palabraMostrar[indice] = letra;
                    advino = true;
                }
        }
    
        if (!advino){
            letrasEquivocadas.push(letra)
            var parteMuñeco = muñecoAhorcado.shift();
            var fn = window[parteMuñeco];
            if (typeof fn === "function") fn.apply(null, null); 
            escribirLetra(letrasEquivocadas.join(" "))                           
        }else{
            escribirPalabraSecreta(palabraMostrar.join(" "))
        }

        if (muñecoAhorcado.length == 0){
             juegoIniciado = false
             habilitarDeshabilitarInput(false)
             mensajeFinal("Fin del Juego!!","red")             
        }else{
            if (!palabraMostrar.includes("_")){
              juegoIniciado = false
              habilitarDeshabilitarInput(false)
              mensajeFinal("Ganaste,Felicidades!!","green")
            }
        }
    }else{
        if (!patt.test(letra)){
            alert("Presione solo letras")
        }else{
            alert("Letra ya elegida")
        }
    }
    
}


window.onload = function() {
    document.onkeypress = muestraInformacion;
}
  
function muestraInformacion(elEvento) {
    var evento = window.event || elEvento;
  
    if (juegoIniciado){
        controlaLetra(String.fromCharCode(evento.charCode))
    }
 }
