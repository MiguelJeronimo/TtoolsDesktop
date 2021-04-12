
let calcular = document.getElementById('calcular');
calcular.onclick = function (e) {
    e.preventDefault();
    let tiempo = document.getElementById('tiempo').value;
    let stamina = document.getElementById('rangoMenor');
    /**separaremos las horas de los minutos */
    let separador = tiempo.split(":");
    let hora = separador[0];
    let minuto = separador[1];
    let patron = RegExp(/^([01]?[0-9]|2[0-9]|3[0-9]|4[0-2]):[0-5][0-9]$/);
    if (patron.test(tiempo)) {
        let minutos_stamina = convertirHoraMinutosStamina(hora, minuto);
        let calculo_stamina_minutos = minutosDeStamina(minutos_stamina);
        convertirMinutosReales(calculo_stamina_minutos);
    } else{
        console.log('No se encuentra dentro del patron');
        stamina.innerText = ':'
    }
}

/**
 * hagamos los calculos correspondientes.
 * primero vamos a calcular cuantas horas tardara en recargar stamina
 * Tomando en cuenta que por cada 1 minuto de stamina es igual a 6 minutos reales
 * Recuerda que la stamina tardara 10 minutos para empezar a recargar despues de loguear
 */

 /**
  * Esta funcion retornara el total de horas que hemos gastado de stamina
  * convertida en minutos
  */
function convertirHoraMinutosStamina(Hora, Minutos) {
    /**42:00 es cuando la estamina se encuentra llena */
    let hora_minutos,topStaminaMinutos,minutosTotales,totalMinutosStamina;    
    hora_minutos = Hora*60;
    topStaminaMinutos = 42*60;
    minutosTotales = parseInt(hora_minutos) + parseInt(Minutos);
    totalMinutosStamina = topStaminaMinutos - minutosTotales;
    return totalMinutosStamina;
}

/**
 * Calculando la stamina
 */
function minutosDeStamina(minutosStamina) {
    let tiempoReal;
    tiempoReal = (minutosStamina*6)+10;
    return tiempoReal;
}

/**
 * convertiremos los minutos reales a formato de hora
 */

 function horasReales(minutos) {
     let minutosHora;
     minutosHora = minutos*60;
     return minutosHora;
 }

function convertirMinutosReales(minutos) {
    let stamina = document.getElementById('rangoMenor');
    let hora_minutos, minutosRestantes;
    hora_minutos = parseInt(minutos/60);
    minutosRestantes = minutos - horasReales(hora_minutos);
    return stamina.innerText = hora_minutos+':'+minutosRestantes;
}
 