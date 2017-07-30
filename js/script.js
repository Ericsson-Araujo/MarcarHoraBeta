$(document).ready(function() {
 $('.progress').hide();
 $('select').material_select();

 verificaResponsivo(window.innerWidth);
  
 $(window).resize(function(){
    var largura = $(window).width();
     verificaResponsivo(largura);
 });
 
 if( parseInt( $('#residencia').val() ) > 1 ){     
    $("#local").val(""); 
    $("#div_local").removeClass('hide');
    //$("#div_local").fadeOut(15000, function() { $(this).removeClass('hide'); } );
    //$("#div_local").fadeIn(15000)
 }
 
 
 $('.datepicker').pickadate({
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 2, // Creates a dropdown of 15 years to control year

    monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    showMonthsShort: undefined,
    showWeekdaysFull: undefined,

    disable: [4],
    formatSubmit: 'dd-mm-yyyy',
    format: 'dd/mm/yyyy',

    //datelimits
    /*
    min: new Date(2015,3,20),
    max: new Date(2015,7,14)
    */

    //disable
    /*
    disable: [
      new Date(2015,3,13),
      new Date(2015,3,29)
    ]
    */

 });

  $('.timepicker').pickatime({
    default: 'now', // Set default time
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
   });

  $('form').submit( function(event) {
    event.preventDefault();
    $("#msg_result").text('Teste Clicou no botão');
    
    var data = $('#dateCalendar').val();
    var time = $('#time').val();
    var dateTime = '';
    var endDateTime = '';
    var hora = 0;
    var hora_final = 0;

    data = data.split('/');
    time = time.split(':');
    hora = parseInt( time[0] );
    hora_final = hora + 1;
    
    if( hora  == 23 ){
        hora = 00;
    }
    
    dateTime = data[2]+'-'+data[1]+'-'+data[0]+'T'+time[0]+':'+time[1]+':00';
    endDateTime = data[2]+'-'+data[1]+'-'+data[0]+'T'+hora_final+':'+time[1]+':00';

    //'dateTime': '2017-06-18T12:20:00',

    var event = {
        'summary': 'Cortar cabelo de '+$('#first_name').val()+' '+$('#last_name').val(),
        'location': $('#local').val(),
        'description': '<b>e-Mail</b>: ' + $('#email').val() + '\n Telefone: ' + $('#fone').val() + '\n Mais detalhes: ' + $('#textarea1').val(),
        'start': {
            'dateTime': dateTime,
            'timeZone': 'America/Sao_Paulo'
        },
        'end': {
            'dateTime': endDateTime,
            'timeZone': 'America/Sao_Paulo'
        },
        'attendees': [
            {'email': 'patrickaraujostar22@gmail.com'},
            {'email': $('#email').val()}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'popup', 'minutes': 120}
            ]
        }
    };

    var request = gapi.client.calendar.events.insert({
      'calendarId': '30ehoks2l8up4civ1oblnp1sug@group.calendar.google.com',
      'resource': event
      });

    request.execute(function(event) {
        $("#msg_result").text('Event created: ' + event.htmlLink);
        
      //alert('Event created: ' + event.htmlLink);
     //appendPre('Event created: ' + event.htmlLink);
   });


 }); //form submit

  $('#residencia').on('change', function(){
      
      if( parseInt( $(this).val() ) > 1 ){     
          $("#local").val(""); 
          //$("#div_local").removeClass('hide').slideDown();
          $("#div_local").slideDown(400, 'swing',function() { $(this).removeClass('hide'); });
          //$("#div_local").fadeIn(15000)
        }else{
            //$("#div_local");
            //$("#div_local").fadeOut(3000).addClass('hide');
            $("#div_local").slideUp(400, 'swing', function() { $(this).addClass('hide'); });
            $("#local").val("Salão"); 
            //$("#div_local").fadeOut(5000)
            
        }
      
    });
  
    function verificaResponsivo(largura) {
      if(largura > 820){
       document.body.className = 'container grey darken-3';
      }else{
        document.body.className = 'container grey darken-4';
      }
    }
  
}); // document ready
