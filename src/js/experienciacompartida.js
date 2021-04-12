/**
 * Calcularemos los rangos de niveles de la experiencia compartida en Tibia
 */
let calcular = document.getElementById("calcular");
let nivel = document.getElementById("nivel");
/***
 * evento click y evento keydown
 */
calcular.onclick = function (e) {
    e.preventDefault();
    let nivel = document.getElementById("nivel").value;
    let formulario = document.getElementById("formulario");
    let leyendaError = document.getElementById("leyenda-error");
    let patron = RegExp(/^\d+$/);
    let rango_menor = document.getElementById("rangoMenor");
    let rango_mayor = document.getElementById("rangoMayor");
    let nivel_menor, nivel_mayor;
    if (nivel !== "") {
        if (patron.test(nivel)) {
            nivel_menor = rangoMenor(nivel);
            nivel_mayor = rangoMayor(nivel);
            rango_menor.innerHTML = nivel_menor;
            rango_mayor.innerHTML = nivel_mayor;    
        }else{
            formulario.classList.add('is-focused','is-invalid', 'is-dirty');
            leyendaError.classList.add('mdl-textfield__error-validacion');
            leyendaError.innerHTML = 'Ingrese el nivel'; 
        }
    } else{
        formulario.classList.add('is-focused','is-invalid', 'is-dirty');
        leyendaError.classList.add('mdl-textfield__error-validacion');
        leyendaError.innerHTML = 'Ingrese el nivel'; 
        rango_menor.innerHTML = '-';
        rango_mayor.innerHTML = '-'; 
    }
}

nivel.onkeydown = function (e) {
    let nivel = document.getElementById("nivel").value;
    validacionCampoTexto(nivel);
}

/**
 * funciones para el calculo de los rangos de la experiencia compartida
 */
 function rangoMenor(nivel) {
     let rango_menor, funcionTecho;
     rango_menor = ((nivel*2)/3);
     funcionTecho = Math.ceil(rango_menor);
     return funcionTecho;
 }

 function rangoMayor(nivel) {
     let rango_mayor, funcionPiso;
     rango_mayor = ((nivel*3)/2);
     funcionPiso = Math.floor(rango_mayor);
     return funcionPiso;
 }

 function validacionCampoTexto(nivel) {
    let formulario = document.getElementById("formulario");
    let leyendaError = document.getElementById("leyenda-error");
    let patron = RegExp(/^\d+$/);
    if (nivel === '') {
        formulario.classList.add('is-focused','is-invalid','is-dirty');
        leyendaError.classList.add('mdl-textfield__error-validacion');
        leyendaError.innerHTML = 'Ingrese el nivel';
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