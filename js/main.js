$(document).ready(function(){

  var lidarViewer = new LidarViewer();

  lidarViewer.getServices(function(services){
    var options = '<option value="">Services</option>';
    for(var i = 0; i < services.length; i++){
      options += '<option value="'+ services[i].name + '/' + services[i].type + '">' + services[i].name + '</option>';
    }
    $('#services').html(options);
  });

  $('#opacitySlider').change(function(e){
    var opacity = $(this).val()/100;
    lidarViewer.layerGroup.eachLayer(function(layer){
      layer.setOpacity(opacity);
    });
  });

  $('#elevation').click(function(e){
    if(lidarViewer.identifyElevationTool){
      $(this).removeClass('active');
      $('#map').removeClass('active');
      lidarViewer.map.off('click', lidarViewer.identifyElevationTool_click);
    } else {
      $(this).addClass('active');
      $('#map').addClass('active');
      lidarViewer.map.on('click', lidarViewer.identifyElevationTool_click);
    }
    lidarViewer.identifyElevationTool = !lidarViewer.identifyElevationTool;
  });

  $('#services').change(function(e){
    var service = $(this).val();
    var opacity = $('#opacitySlider').val()/100;
    lidarViewer.addServiceLayer(service, opacity);
    $('#elevation').prop('disabled', false);
  });

  $("#clear").click(function(){
    lidarViewer.layerGroup.clearLayers();
    $('#elevation').prop('disabled', true);
    $('#services').val('');
  });
});