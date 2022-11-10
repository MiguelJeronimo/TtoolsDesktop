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
    let url = 'https://api.tibiadata.com/v3/worlds';
    let array;
    let worlds
    fetch(url).
    then(function(resp){return resp.json()}).
    then(function(data){
         try{
             let selectWorlds = document.getElementById('selectWorlds');
             let opciones = document.createElement('option');//crear un elemento
             array = data.worlds.regular_worlds.length;
             opciones.value="";
             opciones.text="Seleccione una opción";
             selectWorlds.appendChild(opciones);
             for (let i = 0; i < array; i++) {
                 worlds = data.worlds.regular_worlds[i].name;
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
     let url = `https://api.tibiadata.com/v3/world/${world}`;
     fetch(url).
     then(function(resp){return resp.json()}).
     then(function (data) {
         try {
             mundo.innerText = data.worlds.world.name;
             players.innerText = data.worlds.world.players_online;
             record_online.innerText = data.worlds.world.record_players +' Players el: '+data.worlds.world.record_date;
             fecha_creacion.innerText = data.worlds.world.creation_date;
             localizacion.innerText = data.worlds.world.location;
             tipo_pvp.innerText = data.worlds.world.pvp_type;
             //mundo.innerText = data.worlds.world.name;
             battleeye.innerText = data.worlds.world.battleye_protected;
             
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
      let url = `https://api.tibiadata.com/v3/world/${world}`;
      fetch(url).
      then(function(resp){return resp.json()}).
      then(function (data) {
          try {
              let array = data.worlds.world.world_quest_titles.length;
            for (let i = 0; i < array; i++) {
                let quest = data.worlds.world.world_quest_titles[i];
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
     let url = `https://api.tibiadata.com/v3/world/${mundo}`;
     let arrayPlayers;
     let array;
     fetch(url).
     then(function(resp){return resp.json()}).
     then(function (data) {
         try {
            array = data.worlds.world.online_players.length;
            for (let i = 0; i < array; i++) {
                let nombre = data.worlds.world.online_players[i].name;
                let nivel = data.worlds.world.online_players[i].level;
                let vocacion = data.worlds.world.online_players[i].vocation;
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
    url = `https://api.tibiadata.com/v3/worlds`;
    let personaje_online = document.getElementById('personaje_online');
    let onlines;
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
       try {
        onlines = data.worlds.players_online;
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
