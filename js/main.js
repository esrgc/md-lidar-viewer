$(document).ready(function(){

  var lidarViewer = new LidarViewer();

  $('#map').on('change', '#opacitySlider', function(e){
    var opacity = $(this).val()/100;
    lidarViewer.layerGroup.eachLayer(function(layer){
      layer.setOpacity(opacity);
    });
  });

  $('#elevation').click(function(e){
    if(lidarViewer.identifyElevationTool){
      $(this).removeClass('active');
      $('#map').removeClass('active');
      lidarViewer.map.off('click', lidarViewer.identifyElevationTool_click, lidarViewer);
    } else {
      $(this).addClass('active');
      $('#map').addClass('active');
      lidarViewer.map.on('click', lidarViewer.identifyElevationTool_click, lidarViewer);
    }
    lidarViewer.identifyElevationTool = !lidarViewer.identifyElevationTool;
  });

  $('#map').on('change', '#services', function(e){
    var service = $(this).val();
    var opacity = $('#opacitySlider').val()/100;
    lidarViewer.addServiceLayer(service, opacity);
    $('#elevation').prop('disabled', false);
  });

  $("#clear").click(function(){
    lidarViewer.layerGroup.clearLayers();
    lidarViewer.drawnItems.clearLayers();
    lidarViewer.linechart.update([]);
    $('#elevation').prop('disabled', true);
    $('#services').val('');
  });
});