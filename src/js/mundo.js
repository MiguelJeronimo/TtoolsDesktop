let calcular = document.getElementById('calcular');
let cuerpo = document.getElementById('cuerpo');

cuerpo.onload  = function (){
    obtenerMundos();
}


/**function obtenerMundos() {
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
 }**/

 function obtenerMundos(){
    let url = 'https://api.tibiadata.com/v2/worlds.json';
    let tabla = document.getElementById('tablas');
    let array;
    let worlds
    let nombre, locacion, onlines, tipo_mundo, adicional;
    fetch(url).
    then(function(resp){return resp.json();}).
    then(function(data){
         try{
             let selectWorlds = document.getElementById('selectWorlds');
             let opciones = document.createElement('option');//crear un elemento
             array = data.worlds.allworlds.length;
             for (let i = 0; i < array; i++) {
                let datos = document.createElement('tr');
                 nombre = data.worlds.allworlds[i].name;
                 onlines = data.worlds.allworlds[i].online;
                 locacion = data.worlds.allworlds[i].location;
                 tipo_mundo = data.worlds.allworlds[i].worldtype;
                 adicional = data.worlds.allworlds[i].additional;
                 datos.innerHTML += `
                    <td class="mdl-data-table__cell--non-numeric">${nombre}</td>
                    <td class="mdl-data-table__cell--non-numeric">${onlines}</td>
                    <td class="mdl-data-table__cell--non-numeric">${locacion}</td>
                    <td class="mdl-data-table__cell--non-numeric">${tipo_mundo}</td>
                    <td class="mdl-data-table__cell--non-numeric">${adicional}</td>
                 `;
                 tabla.appendChild(datos);

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