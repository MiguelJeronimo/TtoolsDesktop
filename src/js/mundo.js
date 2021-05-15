let calcular = document.getElementById('calcular');
let cuerpo = document.getElementById('cuerpo');
cuerpo.onload  = function (){
  obtenerMundos();
  Rashid()
  playerOnline()
}

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
                    <tr>
                    <td class="mdl-data-table__cell--non-numeric">${nombre}</td>
                    <td class="mdl-data-table__cell--non-numeric">${onlines}</td>
                    <td class="mdl-data-table__cell--non-numeric">${locacion}</td>
                    <td class="mdl-data-table__cell--non-numeric">${tipo_mundo}</td>
                    <td class="mdl-data-table__cell--non-numeric">${adicional}</td>
                    </tr>
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

 function playerOnline() {
    url = `https://api.tibiadata.com/v2/worlds.json`;
    let personaje_online = document.getElementById('personaje_online');
    let onlines;
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
       try {
        onlines = data.worlds.online;
        personaje_online.innerText= 'Personajes online: '+onlines;
       } catch (error) {
           console.error(error);
       }
    }).catch(function (error) {
        console.error(error.error());
    });
  }

  function Rashid() {
    url = `https://api.tibialabs.com/v1/rashid/city`;
    let spam_rashid = document.getElementById('rashid');
    let rashid;
    fetch(url)
    .then((resp) => resp.text())
    .then(function (data) {
       try {
        rashid = data;
        spam_rashid.innerHTML= '<img src="img/rashid.gif"> Hoy Rashid se encuentra en '+rashid;
       } catch (error) {
           console.error(error);
       }
    }).catch(function (error) {
        console.error(error.error());
    });
  }
