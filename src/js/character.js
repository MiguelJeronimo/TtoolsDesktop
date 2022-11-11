/**
 * Haremos referencia a los datos de la api publica https://tibiadata.com/ , para traer los datos de los personajes de tibia
 */
let calcular = document.getElementById("calcular");
let nivel = document.getElementById("nivel");

calcular.onclick = function (e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    buscarPersonaje(nombre);
}

function buscarPersonaje(nombre) {
    url = `https://api.tibiadata.com/v3/character/${nombre}`;
    // Variables para extraer los datos de personaje
    let name, title, sex, vocation, level, Achievement_Points,world, residence, Guild_Membership,
     Last_Login, comment, Account_Status, guildRank, guilds, house, muertes, informacion, otros_personajes;

    let tablaContenido = document.getElementById('tabla');
    let error;
    if(nombre !== ""){
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
       // console.log(data.characters.data.last_login[0].date);
       //console.log(data.characters.deaths[0].reason);
       try {
        if (data.characters.character.name =="") {
            tablaContenido.innerHTML = `<spam><strong class="error" id="error">Personaje no existe</strong></spam>`;
        } else{
            name = data.characters.character.name;
            title = data.characters.character.title;
            sex = data.characters.character.sex;
            vocation = data.characters.character.vocation;
            level = data.characters.character.level;
            Achievement_Points = data.characters.character.achievement_points;
            world = data.characters.character.world;
            residence = data.characters.character.residence;
            Guild_Membership = data.characters.character.guild;
            Last_Login = data.characters.character.last_login;
            comment = data.characters.character.comment;
            Account_Status = data.characters.character.account_status;
            house = data.characters.character.houses
            muertes = data.characters.deaths
            informacion = data.characters.account_information
            otros_personajes = data.characters.other_characters
            Houses(house)
            Muertes(muertes)
            accountInformation(informacion)
            otrosPersonajes(otros_personajes)

            if (Guild_Membership !== undefined) {
                guildName = data.characters.character.guild.name;
                guildRank = data.characters.character.guild.rank;
                guilds= guild(guildRank, guildName);
            } else{
                guilds = 'No tiene guild';
            }
            
            tablaContenido.innerHTML = `<table class="mdl-data-table mdl-js-data-table with=1000px">
            <tbody id="tabla">
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Nombre</td>
                <td class="mdl-data-table__cell--non-numeric">${name}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Titulo</td>
                <td class="mdl-data-table__cell--non-numeric">${title}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Sexo:</td>
                <td class="mdl-data-table__cell--non-numeric">${sex}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Vocación</td>
                <td class="mdl-data-table__cell--non-numeric">${vocation}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Level</td>
                <td class="mdl-data-table__cell--non-numeric">${level}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Achievement Points:</td>
                <td class="mdl-data-table__cell--non-numeric">${Achievement_Points}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Mundo:</td>
                <td class="mdl-data-table__cell--non-numeric">${world}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Guild membership:</td>
                <td class="mdl-data-table__cell--non-numeric">${guilds}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Ultima conexión:</td>
                <td class="mdl-data-table__cell--non-numeric">${Last_Login}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Comentario:</td>
                <td class="mdl-data-table__cell--non-numeric texto" >${comentario(comment)}</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">Account Status:</td>
                <td class="mdl-data-table__cell--non-numeric">${Account_Status}</td>
              </tr>
            </tbody>
                </table>`;
        }
       } catch (error) {
           console.error(error);
       }
    }).catch(function (error) {
        console.error(error.error());
    });
  } else{
      let formulario = document.getElementById("formulario");
      let leyendaError = document.getElementById("leyenda-error");
      formulario.classList.add('is-focused','is-invalid','is-dirty');
      leyendaError.classList.add('mdl-textfield__error-validacion');
      leyendaError.innerHTML = 'Ingrese el nombre del personaje';
      tablaContenido.innerText='';
  }
}
/**
 * Estas funciones validaran ciertos datos del personaje
 * que puede o no puede tener
 */

function comentario(comentario) {
    if (comentario !== undefined) {
      return comentario;      
    } else {
        return 'No tiene comentario';
    }
}

function guild(rango, nombreGuild) {
    if (rango !== undefined && nombreGuild !== undefined) {
        return rango +' of the '+nombreGuild;
    } else{
        return 'No tiene guild';
    }
}

function Houses(houses) {
  let tabla = document.getElementById('tabla-houses')
  let plantilla = ""
  if(houses !== undefined){
     plantilla+=`
    <table class="mdl-data-table mdl-js-data-table with=1000px">
          <caption>Casas</caption>
          <tbody id="tabla">
    `
    houses.forEach(casas => {
      plantilla+=`
            <tr>
              <td class="mdl-data-table__cell--non-numeric">House</td>
              <td class="mdl-data-table__cell--non-numeric">${casas.name}, ${casas.town}, ${casas.paid}</td>
            </tr>
      `
    })
    plantilla +=`
    </tbody>
    </table>`

   tabla.innerHTML = plantilla
  } else{
   tabla.innerHTML =""
  }
}
function Muertes(muertes) {
  let tabla = document.getElementById('tabla-muertes')
  let plantilla = ""
  if(muertes !== undefined){
     plantilla+=`
    <table class="mdl-data-table mdl-js-data-table with=1000px">
          <caption>Muertes</caption>
          <tbody id="tabla">
    `
    muertes.forEach(muerte => {
      plantilla+=`
            <tr>
              <td class="mdl-data-table__cell--non-numeric">${muerte.time}</td>
              <td class="mdl-data-table__cell--non-numeric">${muerte.reason}</td>
            </tr>
      `
    })
    plantilla +=`
    </tbody>
    </table>`

   tabla.innerHTML = plantilla
  } else{
   tabla.innerHTML =""
  }
}

function accountInformation(informacion) {
  let tabla = document.getElementById('tabla-informacion')
  console.log(informacion)
  let plantilla = ""
  if(informacion.created !== undefined){
     plantilla+=`
    <table class="mdl-data-table mdl-js-data-table with=1000px">
          <caption>Información de la cuenta</caption>
          <tbody id="tabla">
    `
    plantilla+=`
            <tr>
              <td class="mdl-data-table__cell--non-numeric">Created:</td>
              <td class="mdl-data-table__cell--non-numeric">${informacion.created}</td>
            </tr>
            <tr>
              <td class="mdl-data-table__cell--non-numeric">Loyalty Title:</td>
              <td class="mdl-data-table__cell--non-numeric">${informacion.loyalty_title}</td>
            </tr>
      `
    plantilla +=`
    </tbody>
    </table>`

   tabla.innerHTML = plantilla
  } else{
   tabla.innerHTML =""
  }
}
function otrosPersonajes(personajes) {
  let tabla = document.getElementById('tabla-otros-personajes')
  console.log(personajes)
  let plantilla = ""
  if(personajes !== undefined){
     plantilla+=`
    <table class="mdl-data-table mdl-js-data-table with=1000px">
          <caption>Información de la cuenta</caption>
          <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Nombre</th>
            <th class="mdl-data-table__cell--non-numeric">Mundo</th>
            <th class="mdl-data-table__cell--non-numeric">Status</th>
            <th class="mdl-data-table__cell--non-numeric">Deleted</th>
            <th class="mdl-data-table__cell--non-numeric">Main</th>
            <th class="mdl-data-table__cell--non-numeric">Traded</th>
          
          </tr>
        </thead>
          <tbody id="tabla">
    `
    personajes.forEach(personaje => {
      let resultado = ""
      //en resultado se validara utilizando un operador ternario ?, donde se validara si el personaje esta online u offline
      plantilla+=`
      <tr class ="${resultado = (personaje.status == "online")?"online":"error"}">
        <td class="mdl-data-table__cell--non-numeric">${personaje.name}</td>
        <td class="mdl-data-table__cell--non-numeric">${personaje.world}</td>
        <td class="mdl-data-table__cell--non-numeric">${personaje.status}</td>
        <td class="mdl-data-table__cell--non-numeric">${personaje.deleted}</td>
        <td class="mdl-data-table__cell--non-numeric">${personaje.main}</td>
        <td class="mdl-data-table__cell--non-numeric">${personaje.traded}</td>
      </tr>
`
    });
    plantilla +=`
    </tbody>
    </table>`

   tabla.innerHTML = plantilla
  } else{
   tabla.innerHTML =""
  }
}