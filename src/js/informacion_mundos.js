let calcular = document.getElementById('calcular');
let cuerpo = document.getElementById('cuerpo');

cuerpo.onload  = function (){
    obtenerMundos();
}


function obtenerMundos() {
    let url = 'https://api.tibiadata.com/v2/worlds.json';
    let array;
    let worlds
    fetch(url).
    then(function(resp){return resp.json();}).
    then(function(data){
         try{
             let selectWorlds = document.getElementById('selectWorlds');
             let opciones = document.createElement('option');//crear un elemento
             array = data.worlds.allworlds.length;
             opciones.value="";
             opciones.text="Seleccione una opción";
             selectWorlds.appendChild(opciones);
             for (let i = 0; i < array; i++) {
                 worlds = data.worlds.allworlds[i].name;
                 let opciones2 = document.createElement('option');
                 opciones2.value =worlds;
                 opciones2.text =worlds;
                 selectWorlds.appendChild(opciones2);
             }
         }
         catch(error){
             console.error(error);
         }
    }).catch(
        function(error){
            console.error(error.error());
     });
 }