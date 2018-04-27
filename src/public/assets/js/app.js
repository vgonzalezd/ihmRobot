//frontend app

(function() {
  $(document).ready(function() {
    var base = $('base').text();

    var j1 = nipplejs.create({
        zone: document.getElementById('j1'),
        color: 'white',
        size: 200
    });

    var j2 = nipplejs.create({
        zone: document.getElementById('j2'),
        color: 'red',
        size: 200
    });

    var posx=0;
    var posz=0;

    j1.on("move", function(event, data){
      var rads = data.angle.radian;
      posx=1 * Math.sin(rads);
    });

    j2.on("move", function(event, data){
      var rads = data.angle.radian;
      posz=-1 * Math.cos(rads);
    });

    j1.on("end", function(event, data){
        posx=0;
    });

    j2.on("end", function(event, data){
        posz=0;
    });



    setInterval(function(event, data){
      console.log('publica');
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: base + '/action',
        data: {
          Myposx : posx,
          Myposz : posz
        },
        error: function (xhr, ajaxOptions, thrownError) {
        console.error();
        },
        timeout: 500,
      });
    }, 1000);


  });


})();



//1. If the document is ready we show and alert
//2. We see if .moveButton (Objets de tell dataType) receive and action (click)
// that changes the url (calling again routes=> execute actionCtrl.postAction)
