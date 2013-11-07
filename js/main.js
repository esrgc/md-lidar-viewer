$(document).ready(function(){
  var lidarViewer = new LidarViewer();

  lidarViewer.getServices(function(services){
    var options = '<option value="">Services</option>';
    for(var i = 0; i < services.length; i++){
      options += '<option value="'+ services[i].name + '/' + services[i].type + '">' + services[i].name + '</option>';
    }
    $('#services').html(options);
  });

  var map = new L.Map('map', {
    layers: lidarViewer.layerGroup
  }).setView(new L.LatLng(38.7, -76.7), 7);

  var popup = new L.popup();

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  mapboxsat.addTo(map);

  map.on("click", function(e){
    lidarViewer.layer.identify(e.latlng, {} , function(res){
      popup.setLatLng(e.latlng)
        .setContent('Elevation: ' + res.value + ' ft')
        .openOn(map);
    });
  });

  $('#opacitySlider').change(function(e){
    var opacity = $(this).val()/100;
    lidarViewer.layerGroup.eachLayer(function(layer){
      layer.setOpacity(opacity);
    });
  });

  $('#services').change(function(e){
    var service = $(this).val();
    lidarViewer.layerGroup.clearLayers();
    var layer = L.esri.imageServerLayer(lidarViewer.base_url + service, {
      opacity : 1,
      transparent: true,
      format: 'png24',
      noData: 0
    });
    lidarViewer.layerGroup.addLayer(layer);
  });

  $("#clear").click(function(){
    lidarViewer.layerGroup.clearLayers();
  });
});