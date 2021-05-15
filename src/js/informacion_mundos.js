let calcular = document.getElementById('calcular');
let cuerpo = document.getElementById('cuerpo');
let selectWorlds = document.getElementById('selectWorlds');

cuerpo.onload  = function (){
    obtenerMundos();
    playerOnline();
    Rashid();
}

selectWorlds.onchange = function (e) {
    let world = e.target.value;
    playerOnlineWorld(world);
    infoWorld(world);
    worldQuestTitle(world);
}

function obtenerMundos() {
    let url = 'https://api.tibiadata.com/v2/worlds.json';
    let array;
    let worlds
    fetch(url).
    then(function(resp){return resp.json()}).
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


 function infoWorld(world) {
    let tablaDatos = document.getElementById('datos');
    let mundo = document.getElementById('mundo');
    let players = document.getElementById('players');
    let record_online = document.getElementById('record_online');
    let fecha_creacion = document.getElementById('fecha_creacion');
    let localizacion = document.getElementById('localizacion');
    let tipo_pvp = document.getElementById('tipo_pvp');
    let battleeye = document.getElementById('battleeye');
   
    if (world == '') {
       // tablaDatos.innerHTML = '';
    }else{
     let url = `https://api.tibiadata.com/v2/world/${world}.json`;
     fetch(url).
     then(function(resp){return resp.json()}).
     then(function (data) {
         try {
             mundo.innerText = data.world.world_information.name;
             players.innerText = data.world.world_information.players_online;
             record_online.innerText = data.world.world_information.online_record.players +' Players el: '+data.world.world_information.online_record.date.date+' '+data.world.world_information.online_record.date.timezone;
             fecha_creacion.innerText = data.world.world_information.creation_date;
             localizacion.innerText = data.world.world_information.location;
             tipo_pvp.innerText = data.world.world_information.pvp_type;
             mundo.innerText = data.world.world_information.name;
             battleeye.innerText = data.world.world_information.battleye_status;
             
         } catch (error) {
             console.log(error);
             //tablaDatos.innerHTML = '';
         }
     }).catch(
        function(error){
            console.error(error.error());
     });
    }
 }

function worldQuestTitle(world) {
    let worldQuest = document.getElementById('worldQuest');
    if (world == '') {
        // tablaDatos.innerHTML = '';
     }else{
      let url = `https://api.tibiadata.com/v2/world/${world}.json`;
      fetch(url).
      then(function(resp){return resp.json()}).
      then(function (data) {
          try {
              let array = data.world.world_information.world_quest_titles.length;
            for (let i = 0; i < array; i++) {
                let quest = data.world.world_information.world_quest_titles[i];
                console.log(quest);
            }
              
          } catch (error) {
              console.log(error);
            
          }
      }).catch(
         function(error){
             console.error(error.error());
      });
     }
}

 function playerOnlineWorld (mundo) {
    let tablaDatos = document.getElementById('datos');
    if (mundo == '') {
        tablaDatos.innerHTML = '';
    }else{
     let url = `https://api.tibiadata.com/v2/world/${mundo}.json`;
     let arrayPlayers;
     let array;
     fetch(url).
     then(function(resp){return resp.json()}).
     then(function (data) {
         try {
            array = data.world.players_online.length;
            for (let i = 0; i < array; i++) {
                let nombre = data.world.players_online[i].name;
                let nivel = data.world.players_online[i].level;
                let vocacion = data.world.players_online[i].vocation;
                tablaDatos.innerHTML += `
                <tr>
                <td class="mdl-data-table__cell--non-numeric" id="nombre">${nombre}</td>
                <td class="mdl-data-table__cell--non-numeric" id="level">${nivel}</td>
                <td class="mdl-data-table__cell--non-numeric" id="vocacion">${vocacion}</td> 
               </tr>`;
            }
         } catch (error) {
             console.log(error);
             tablaDatos.innerHTML = '';
         }
     }).catch(
        function(error){
            console.error(error.error());
     });
    }

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
