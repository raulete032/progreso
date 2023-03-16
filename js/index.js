
/**
 * 0% a 25% -> bg-success
 * 25% a 50% -> bg-info
 * 50% a 75% -> bg-warning
 * 75% a 100% -> bg-danger
 */

const year= document.querySelector("#year");
const month= document.querySelector("#month");
const weeek= document.querySelector("#week");
const day= document.querySelector("#day");
const workingDay= document.querySelector("#workingDay");

setInterval(() => {

    let now= new Date();

    /**PORCENTAJE AÑO */
    porcentajeYear(now);
    
    /**PORCENTAJE MES */
    porcentajeMonth(now);
    
    /**PORCENTAJE SEMANA */
    porcentajeWeek(now);
    
    /**PORCENTAJE DÍA */
    porcentajeDay(now);

    /**PORCENTAJE JORNADA TRABAJO */
    porcentajeWorkingDay(now);
    
}, 1000);


/**
 * Función que devuelve el día del año actual
 * @param {*} now 
 * @returns 
 */
function diaAno(now){
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let diaAño = Math.floor(diff / oneDay);   

    return diaAño;
}

/**
 * Función que establece el % de año transcurrido
 * @param {*} now 
 */
function porcentajeYear(now){
    let porcentaje=0;
    let dayOfYear= diaAno(now);

    let bisiesto= esBisiesto(now);
    let restantes=0;
    if(bisiesto)
        restantes= 366-dayOfYear;
    else
        restantes= 365-dayOfYear;
    
    if(bisiesto)
        porcentaje= (dayOfYear*100)/366;
    else
        porcentaje= (dayOfYear*100)/365;
    

    porcentaje= redondea(porcentaje);
    anadirClass(year, porcentaje);
    year.style.width=porcentaje+"%";
    year.innerHTML= porcentaje+"%";
}



/**
 * Función que establece el % de mes transcurrido
 * @param {*} now 
 */
function porcentajeMonth(now){
    let porcentaje=0;
    let mes= now.getMonth();
    let diaMes= now.getDate();
    let totalDíasMes=0;
    //30 días
    if(mes==3 || mes==5 || mes==8 || mes==10){ //abr, jun, sep, nov
        totalDíasMes=30;
    }
    //28 o 29 días
    else if(mes==1){//feb
        if(esBisiesto)
            totalDíasMes=29;
        else
            totalDíasMes=28;
    }
    //31 días
    else{ //ene, mar, may, jul, ago, oct, dic
        totalDíasMes=31;
    }

    porcentaje= (diaMes*100)/totalDíasMes;
    porcentaje= redondea(porcentaje);
    anadirClass(month, porcentaje);
    month.style.width=porcentaje+"%";
    month.innerHTML=porcentaje+"%";


}


/**
 * Función que establece el % de semana transcurrido
 * @param {*} now 
 */
function porcentajeWeek(now){
    let porcentaje=0;
    let diaSemana= now.getDay();
    if(diaSemana==0)
        diaSemana=7;
    
    porcentaje= (diaSemana*100)/7;
    porcentaje=redondea(porcentaje);
    anadirClass(weeek, porcentaje);
    weeek.style.width=porcentaje+"%";
    weeek.innerHTML=porcentaje+"%";

}

/**
 * Función que establece el % de día transcurrido
 * @param {*} now 
 */
function porcentajeDay(now){
    let porcentaje=0;
    // Obtenemos la fecha y hora actual
    let fechaActual = new Date();
    // let horaActual = fechaActual.getHours();
    // let minutosActual = fechaActual.getMinutes();
    // let segundosActual = fechaActual.getSeconds();

    // Obtenemos la fecha y hora de final del día
    let finalDelDia = new Date();
    finalDelDia.setHours(23, 59, 59, 999);

    // Calculamos la cantidad de milisegundos que quedan para terminar el día
    let milisegundosRestantes = finalDelDia - fechaActual;

    // Calculamos el porcentaje de día que queda
    let milisegundosEnUnDia = 1000 * 60 * 60 * 24;
    porcentaje = (milisegundosRestantes / milisegundosEnUnDia) * 100;
    porcentaje=redondea(porcentaje);
    anadirClass(day, porcentaje);
    day.style.width=porcentaje+"%";
    day.innerHTML=porcentaje+"%";
}


function porcentajeWorkingDay(now) {

    let entrada = document.getElementById("entrada").value;
    let salida = document.getElementById("salida").value;
    let porcentaje=0;
    if(entrada!="" && salida!=""){
        entrada= dameHora(entrada); //Fecha y hora en la que entro
        salida= dameHora(salida); //Fecha y hora en la que voy a salir
    
        // Convertimos las horas y minutos en milisegundos

    
        let milisegundosEntrada= entrada.getTime();
        let milisegundosSalida= salida.getTime();
        let milisegundosActuales= now.getTime();

        // Milisegundos que voy a trabajar
        let milisegundosTrabajo = milisegundosSalida - milisegundosEntrada;
        let milisegundosTrabajados= milisegundosSalida - milisegundosActuales;

    
        // Calculamos el porcentaje de tiempo que queda
        porcentaje= (milisegundosTrabajados*100/milisegundosTrabajo);
        porcentaje= 100-porcentaje;

        if(porcentaje>100)
            porcentaje=100;
        
        porcentaje= redondea(porcentaje);        
        anadirClass(workingDay, porcentaje);
        workingDay.style.width=porcentaje+"%";
        workingDay.innerHTML=porcentaje+"%";       
        porcentaje=redondea(porcentaje);
        workingDay.style.width=porcentaje+"%";
        workingDay.innerHTML=porcentaje+"%";    
         
    }
}



function esBisiesto(now){

    let year= now.getFullYear();
    
    sw=false;

    if(year%4!=0)
        sw=false;
    else
        if(year%100!=0)
            sw=true;
        else
            if(year%400!=0)
                sw=false;
            else
                sw=true;
    return sw;
}


function anadirClass(elemento, porcentaje){

    porcentaje= parseFloat(porcentaje);

    if(porcentaje<=25)
        elemento.classList.add("bg-success");
    else if(porcentaje<=50)
        elemento.classList.add("bg-info");
    else if(porcentaje<=75)
        elemento.classList.add("bg-warning");
    else
        elemento.classList.add("bg-danger");


}


function redondea(num) {
    return Math.round(num * 100) / 100;
}




function dameHora(value) {

    let h= parseInt(value.split(":")[0]);
    let m= parseInt(value.split(":")[1]);

    let hoy= new Date();

    hoy= new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), h, m, 0 );

    return hoy;
}