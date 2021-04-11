/**Calcularemos las blessings en Tibia online
 * 
 * Etiquetas donde se imprimira los calculos
 */
let spiritual = document.getElementById("spiritual");
let embrace = document.getElementById("embrace");
let suns = document.getElementById("suns");
let solitude = document.getElementById("solitude");
let phoenix = document.getElementById("phoenix");
let twits = document.getElementById("twits");
let heart = document.getElementById("heart");
let blood = document.getElementById("blood");
let total = document.getElementById("total");

/**Campo de texto y boton */
let nivel = document.getElementById("nivel");
let botonCalcular = document.getElementById("calcular");
/**Checkbox de las bless heart y blood of mountain */
let checkboxHeart = document.getElementById("switch-1");
let checkboxBlood = document.getElementById("switch-2");
/**eventos */
botonCalcular.addEventListener('click',eventos,false);
nivel.addEventListener('keydown',eventos,false);
checkboxHeart.addEventListener('change',eventos,false);
checkboxBlood.addEventListener('change',eventos,false);

let bless;
let totalblessings;
let blessEspecial;
let blessEspecial2;
/***
 * en esta funcion vamos a controlar los eventos de los componentes 
 **/
function eventos(evt) {
     optenerEvento = evt.type;
     let nivel = document.getElementById("nivel").value;
     if (optenerEvento == 'click') {
        evt.preventDefault();
        let patron = RegExp(/^\d+$/);
        validacion(nivel);
        totalblessings=0;
        if (patron.test(nivel)){
            bless = blessIndividual(nivel);   
            spiritual.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            embrace.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            suns.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            solitude.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            phoenix.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            twits.innerHTML = new Intl.NumberFormat("en-IN").format(bless)+' gold(s)'; 
            totalblessings = bless*6; 
            total.innerHTML = new Intl.NumberFormat("en-IN").format(totalblessings)+' gold(s)'; 
        } else{
            spiritual.innerHTML = '--'; 
            embrace.innerHTML = '--';
            suns.innerHTML = '--';
            solitude.innerHTML = '--';
            phoenix.innerHTML = '--';
            twits.innerHTML = '--';
            total.innerHTML = '--';
            totalblessings = 0;
        }
     } else if (optenerEvento == 'keydown') {
        validacionCampoTexto(nivel);
     } else if(optenerEvento == 'change'){
        if (checkboxHeart.checked) {
           if (nivel != '') {
                blessEspecial = blessingEspecial(nivel);
                heart.innerHTML = new Intl.NumberFormat("en-IN").format(blessEspecial)+' gold(s)';
           } else{
               Errores();
               heart.innerHTML = '--';
               totalblessings =0;
           }
         } else{
            heart.innerHTML = "--";
            blessEspecial = 0;
         }

         if (checkboxBlood.checked){
            if (nivel !='') {
                blessEspecial2 = blessingEspecial(nivel);
                blood.innerHTML = new Intl.NumberFormat("en-IN").format(blessEspecial2)+' gold(s)';
            } else{
                Errores();
                blood.innerHTML = '--';
                totalblessings =0;
            }
         } else{
            blood.innerHTML = "--";
            blessEspecial2 = 0;
         }

         if (isNaN(totalblessings)) {
            totalblessings=0;
         }

         total.innerHTML = new Intl.NumberFormat("en-IN").format(totalblessings + blessEspecial + blessEspecial2) +' gold(s)';
     }
     
}

/**
 * Esta funcion calcula el costo unitario de las blessings principales.
 * Incluyendo el costo de la twist of fate
 */
function blessIndividual(nivel) {
    const constante = 200;
    let blessing;
    if (nivel <= 30) {
         blessing = 2000;
    } else if (nivel >= 31 && nivel < 120) {
        blessing = constante * (nivel - 20);
    } else{
        blessing = 20000;
    }

    return blessing;
}

/**
 * Esta funcion calcula el costo unitario de los bless Heart of mountain
 * y Blood of mountain
 */
function blessingEspecial(nivel) {
    const constante = 260;
    let blessing_especial;
    if (nivel <=30) {
        blessing_especial = 2600;
    } else if (nivel >=30 && nivel < 120) {
        blessing_especial = constante * (nivel - 20);
    } else{
        blessing_especial = 26000;
    }

    return blessing_especial;   
}


function Errores() {
    let formulario = document.getElementById("formulario");
    let leyendaError = document.getElementById("leyenda-error");
    formulario.classList.add('is-focused','is-invalid', 'is-dirty');
    leyendaError.classList.add('mdl-textfield__error-validacion');
    leyendaError.innerHTML = 'El campo esta vacio'; 
}


function validacion(nivel) {
    let formulario = document.getElementById("formulario");
    let leyendaError = document.getElementById("leyenda-error");
    if (nivel == '') {
        formulario.classList.add('is-focused','is-invalid', 'is-dirty');
        leyendaError.classList.add('mdl-textfield__error-validacion');
        leyendaError.innerHTML = 'El campo esta vacio';
        spiritual.innerHTML = '--'; 
        embrace.innerHTML = '--';
        suns.innerHTML = '--';
        solitude.innerHTML = '--';
        phoenix.innerHTML = '--';
        twits.innerHTML = '--';
    }
}

function validacionCampoTexto(nivel) {
    let formulario = document.getElementById("formulario");
    let leyendaError = document.getElementById("leyenda-error");
    let patron = RegExp(/^\d+$/);
    if (nivel === '') {
        formulario.classList.add('is-focused','is-invalid','is-dirty');
        leyendaError.classList.add('mdl-textfield__error-validacion');
        leyendaError.innerHTML = 'El campo esta vacio';
    } else if (patron) {
        leyendaError.innerHTML = 'Debe ingresar un numero entero';
    }
     else{
        formulario.classList.remove('is-focused','is-invalid');
        leyendaError.classList.remove('mdl-textfield__error-validacion');
        leyendaError.classList.add('mdl-textfield__error')
        leyendaError.innerHTML = 'Debe ingresar un numero entero';
    }    
}

function nada() {
    console.log("funcionando");
}
