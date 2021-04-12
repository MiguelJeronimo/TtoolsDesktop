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
    url = `https://api.tibiadata.com/v2/characters/${nombre}.json`;
    // Variables para extraer los datos de personaje
    let name, title, sex, vocation, level, Achievement_Points,world, residence, Guild_Membership,
     Last_Login, comment, Account_Status, guildName, guildRank, guilds;

    let tablaContenido = document.getElementById('tabla');
    let error;
    if(nombre !== ""){
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
       // console.log(data.characters.data.last_login[0].date);
       //console.log(data.characters.deaths[0].reason);
       try {
        if (data.characters.error) {
            error = data.characters.error;
            tablaContenido.innerHTML = `<spam><strong class="error" id="error">${error}</strong></spam>`;
        } else{
            name = data.characters.data.name;
            title = data.characters.data.title;
            sex = data.characters.data.sex;
            vocation = data.characters.data.vocation;
            level = data.characters.data.level;
            Achievement_Points = data.characters.data.achievement_points;
            world = data.characters.data.world;
            residence = data.characters.data.residence;
            Guild_Membership = data.characters.data.guild;
            Last_Login = data.characters.data.last_login[0].date+' '+data.characters.data.last_login[0].timezone;
            comment = data.characters.data.comment;
            Account_Status = data.characters.data.account_status;
            
            if (Guild_Membership !== undefined) {
                guildName = data.characters.data.guild.name;
                guildRank = data.characters.data.guild.rank;
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
