let calcular = document.getElementById('calcular');
let cuerpo = document.getElementById('cuerpo');
cuerpo.onload  = function (){
  obtenerCriaturas();
  Rashid()
  playerOnline()
}

 function obtenerCriaturas(){
    let url = 'https://api.tibiadata.com/v3/creatures';
    let tabla = document.getElementById('tablas');
    let bosted, criaturas;
    let plantilla = ""
    fetch(url).
    then(function(resp){return resp.json();}).
    then(function(data){
         try{
             bosted = data.creatures.boosted
             criaturas = data.creatures.creature_list
             plantilla +=`
             <tr>
             <td class="mdl-data-table__cell--non-numeric"><img src="${bosted.image_url}" alt=""></td>
             <td class="mdl-data-table__cell--non-numeric">Today´s boss: ${bosted.name}</td>
             <td class="mdl-data-table__cell--non-numeric">${bosted.race}</td>
             </tr>
             `
            criaturas.forEach(criatura => {
                 plantilla += `
                    <tr>
                    <td class="mdl-data-table__cell--non-numeric"><img src="${criatura.image_url}"></td>
                    <td class="mdl-data-table__cell--non-numeric">${criatura.name}</td>
                    <td class="mdl-data-table__cell--non-numeric">${criatura.race}</td>
                    </tr>
                 `;
           });
           tabla.innerHTML = plantilla
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
