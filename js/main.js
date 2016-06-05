$(function main() {


    var tg1 = $("#placement").timeline({
            "timezone":"-10:00",
            "min_zoom":1,
            "max_zoom":55,
            "image_lane_height":100,
            "icon_folder":"timeglider/icons/",
            "data_source":"json/dgs_events.json",
            "constrain_to_data": false
    }); //end timeline init

    tg_actor = tg1.data("timeline");

    function stretchTG() {
        var doc_ht = $(window).height()
        $("#placement").css({"height":doc_ht});
        tg_actor.resize();
    } //end strechTG (for fullscreen)

    function addCustomEvent() {
        $.ajax({
            type: "POST",
            url:"/cgi-bin/tg_update.py",
            data: $("#event_update").serialize(),
            success: function(data) {
                console.log(data);
                dialog.dialog('close');
                tg_actor.addEvent(data, true);

            } //end success
        }) //end ajax
    } //end addCustomEvent
/*
var obj = {
  "id":"new_event_id",
  "title":"New Event!",
  "startdate":"today", // or YYYY-MM-DD format
  "importance":32,
  "icon":"star_red.png",
  "timelines":["dgsTimeline"]
}

tg_actor.addEvent(obj);
$('.tg-timeline-add').click(function(){
    tg_actor.addEvent(obj, true)
    })
*/
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 600,
      width: 450,
      modal: true,
      buttons: {
        "Add an Event": addCustomEvent,
        "Cancel": function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      },
        show: {
            effect: 'slide',
            direction: 'down'
        },
        hide: {
            effect: 'slide',
            direction:'down'
        }
    }); // end dialog init
    $( "#startdate" ).datepicker();
    $( "#enddate" ).datepicker();


    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addCustomEvent();
    });

    $( ".tg-timeline-add" ).on( "click", function() {
      dialog.dialog( "open" );
    });


    window.setTimeout(function() {
        stretchTG()
    }, 500);

    $(window).resize( $.debounce( 250, false, function(e){
        stretchTG()
    }));


})