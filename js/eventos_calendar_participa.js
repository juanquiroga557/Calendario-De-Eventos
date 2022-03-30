$(document).ready(function () {
    CalendarioEventos();
});

function formatDateFecha(dateString) {
    var allDate = dateString.split('T');
    var thisDate = allDate[0].split('-');
    var thisTime = allDate[1].split(':');
    var newDate = [parseInt(thisDate[2]), parseInt(thisDate[1]), parseInt(thisDate[0])].join("/");

    var suffix = thisTime[0] >= 12 ? "PM" : "AM";
    var hour = thisTime[0] > 12 ? thisTime[0] - 12 : thisTime[0];
    var hour = hour < 10 ? "0" + hour : hour;
    var min = thisTime[1];
    var sec = thisTime[2];


    return newDate;
}


function CalendarioEventos() {
    $.ajax({
        url: location.protocol + "//" + location.host + "/Participa" + "/_api/web/lists/getbytitle('CalendarioEventos')/items?$filter=Category%20eq%20%27Participaci%C3%B3n%20ciudadana%27",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: onSuccessCalEv,
        error: onError
    });
}


function onSuccessCalEv(data) {


    var query = window.parent.location.search.substring(1);
    var vars = query.split("=");
    var ID = vars[1];
    var html = [];
    var resultados = data.d.results;
    var events = [];
    var ind = 0;
    //VARIABLES DE LOS EVENTOS
    var fechaInicial = 0;
    var fechaFinal = 0;
    var descripcion;
    var lugar;
    var horaInicial;
    var horaFinal;


    for (var i = 0; i < resultados.length; i++) {

        var dateEvent = resultados[i].EventDate;
        var date = new Date(resultados[i].EventDate);
        fechaInicial = formatDateFecha(date.toISOString());
        var date2 = new Date(resultados[i].EndDate);
        fechaFinal = formatDateFecha(date2.toISOString());
        var FechaActual = new Date();


        if (ID == resultados[i].ID) {

            var url = 'javascript:void(0);';
            if (resultados[i].Url != null && resultados[i].Url != "") {
                url = resultados[i].Url;
            }

            if (resultados[i].fAllDayEvent) {
                descripcion = resultados[i].Description;
                lugar = resultados[i].Location;
                horaInicial = date.getHours() + ':' + date.getMinutes();
                horaFinal = date2.getHours() + ':' + date2.getMinutes();
            } else {
                descripcion = resultados[i].Description;
                lugar = resultados[i].Location;
                horaInicial = date.getHours() + ':' + date.getMinutes();
                horaFinal = date2.getHours() + ':' + date2.getMinutes();
            }


            $("#GlosarioDiv1").html(date.getMonth());
            $("#GlosarioDiv2").html(date.getFullYear());
            $("#GlosarioDiv3").html(date);
            $(".fff").click();
        }

        else {

            if (window.parent.location.href.indexOf("IE=") == -1) {
                if ((date.getMonth() == FechaActual.getMonth()) && (date.getYear() == FechaActual.getYear())) {
                    var strc = 'javascript:void(0);';
                    if (resultados[i].Url != null && resultados[i].Url != "") {
                        strc = resultados[i].Url;
                    }


                    if (resultados[i].fAllDayEvent) {
                        ddescripcion = resultados[i].Description;
                        lugar = resultados[i].Location;
                        horaInicial = date.getHours() + ':' + date.getMinutes();
                        horaFinal = date2.getHours() + ':' + date2.getMinutes();
                    } else {
                        descripcion = resultados[i].Description;
                        lugar = resultados[i].Location;
                        horaInicial = date.getHours() + ':' + date.getMinutes();
                        horaFinal = date2.getHours() + ':' + date2.getMinutes();
                    }

                }
            }
        }


        if (resultados[i].ID != 0) {

            if (resultados[i].fAllDayEvent) {
                descripcion = resultados[i].Description;
                lugar = resultados[i].Location;
                horaInicial = date.getHours() + ':' + date.getMinutes();
                horaFinal = date2.getHours() + ':' + date2.getMinutes();
            }
            else {
                descripcion = resultados[i].Description;
                lugar = resultados[i].Location;
                horaInicial = date.getHours() + ':' + date.getMinutes();
                horaFinal = date2.getHours() + ':' + date2.getMinutes();
            }
        }



        if (fechaInicial != null & fechaFinal != null ) {
             obtenerEventDay(dateEvent);
        }
    }

    
    
    $(".button-month-next, .button-month-previous, .button-year-previous, .button-year-next").click(function () {
        CalendarioEventosMes();
        CargarEventos();
    });
    if (window.parent.location.href.indexOf("IE=") > -1) {
        $(".fff").click();
        $(".button-month-previous").click();
        $(".button-month-next").click();
    }

}


function CalendarioEventosMes() {
    $.ajax({
        url: location.protocol + "//" + location.host + "/Participa" +  "/_api/web/lists/getbytitle('CalendarioEventos')/items?$filter=Category%20eq%20%27Participaci%C3%B3n%20ciudadana%27",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: onSuccessCalEvMes,
        error: onError
    });
}

 function onSuccessCalEvMes(data) {
    var html = [];
    var resultados = data.d.results;

     for (var i = 0; i < resultados.length; i++) {
         var dateEvent = resultados[i].EventDate
         var date = new Date(resultados[i].EventDate);
         var fechaInicial = formatDateFecha(date.toISOString())
         var date2 = new Date(resultados[i].EndDate);
         var fechaFinal = formatDateFecha(date2.toISOString());

         if (fechaInicial != null & fechaFinal != null) {
             obtenerEventDay(dateEvent);
         }
     }
}

function obtenerEventDay(date) {

    let elementYearEvent = date.substring(0, 4);
    let elementMonthEvent = date.substring(5, 7);
    let elementDayEvent = date.substring(8, 10);

    if (elementDayEvent.startsWith('0')) {
       elementDayEvent =  elementDayEvent.substring(1);
    }

    let elementDayCalendar = document.getElementsByClassName('day');
    let elementYearCalendar = document.getElementsByClassName('visualyear');
    let elementMonthCalendar = GetMes();

    year = elementYearCalendar[0].textContent;

    if (year == elementYearEvent & elementMonthEvent == elementMonthCalendar) {

         GetDay(elementDayEvent, elementDayCalendar);

         if (elementMonthEvent.startsWith('0')) {
             elementMonthEvent = elementMonthEvent.substring(1);
         }

         clickButtonEvent(elementYearEvent, elementMonthEvent, elementDayEvent);
    }
}


function GetDay(elementDayEvent, elementDayCalendar) {

    for (day of elementDayCalendar) {

        if (elementDayEvent == day.textContent) {
            day.classList.add('event')
            bandera = true;
        }
    }
}



function clickButtonEvent(year, month, day) {
    let id = '#bic_calendar';
    let fecha = "";
    let calendarId = `${id}_${day}_${month}_${year}`;
	let tempCalendarId = "";
	
    $(calendarId).click(function () {
        CargarEventos();
        listar_evento(day);
        
        if(tempCalendarId == calendarId) {
        	$('.event').css('background-color', '#C9C9C9');
        	CargarEventos();
        	tempCalendarId = "";
        }   
        else {
        	$('.event').css('background-color', '#C9C9C9');
        	$(calendarId).css('background-color', '#863848');
        	tempCalendarId = calendarId;	
        }
    }); 
}



function listar_evento(day) {
    let fechas = document.getElementsByClassName('span-fecha');
    let contadorEventos = 0;

    for (let elemento of fechas) {

        let fecha = elemento.innerText;
        fecha = fecha.replace('\n', '');
        fechaArreglo = fecha.split(' ');
        contenedoresEventos = document.getElementsByClassName('post');
       
        if (fechaArreglo[2] != day & fechaArreglo[1] != $('#visualmonth').html()) { 
            contenedoresEventos[contadorEventos].style = 'display: none';
        }

        contadorEventos++;
        console.log();
    }
}

function CargarEventos() {
    let eventos = document.getElementsByClassName('post');

    for (let evento of eventos ) {
        evento.style = 'display: inherit';
    }
}

function GetMes() {
    var strMes = "";
    if ($(".visualmonth").html() == "Enero") { strMes = "01"; }
    if ($(".visualmonth").html() == "Febrero") { strMes = '02'; }
    if ($(".visualmonth").html() == "Marzo") { strMes = '03'; }
    if ($(".visualmonth").html() == "Abril") { strMes = '04'; }
    if ($(".visualmonth").html() == "Mayo") { strMes = '05'; }
    if ($(".visualmonth").html() == "Junio") { strMes = '06'; }
    if ($(".visualmonth").html() == "Julio") { strMes = '07'; }
    if ($(".visualmonth").html() == "Agosto") { strMes = '08'; }
    if ($(".visualmonth").html() == "Septiembre") { strMes = '09'; }
    if ($(".visualmonth").html() == "Octubre") { strMes = '10'; }
    if ($(".visualmonth").html() == "Noviembre") { strMes = '11'; }
    if ($(".visualmonth").html() == "Diciembre") { strMes = '12'; }
    return strMes;
}

function onError(error) {
    alert(error);
}