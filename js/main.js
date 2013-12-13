$(document).ready(function(){

  var lidarViewer = new LidarViewer();

  $('#map').on('change', '.opacity-slider', function(e){
    var index = $('.opacity-slider').index(this);
    var layer = lidarViewer.terrainGroup.getLayers()[index];
    var opacity = $(this).val()/100;
    $($('.opacity-value').get(index)).html(parseInt(opacity*100) + '%');
    layer.setOpacity(opacity);
  });

  $('#map').on('change', '#services', function(e){
    var service = $(this).val();
    var opacity = $('#opacitySlider').val()/100;
    lidarViewer.addServiceLayer(service, opacity);
    $('#elevation').prop('disabled', false);
  });

  $('#map').on('change', '#counties', function(e){
    var county = $(this).val();
    lidarViewer.countylayer.eachLayer(function(layer){
      if(layer.feature.properties.name === county){
        lidarViewer.map.fitBounds(layer.getBounds());
      }
    });
  });

  $("#clear").click(function(){
    lidarViewer.layerGroup.clearLayers();
    lidarViewer.drawnItems.clearLayers();
    lidarViewer.linechart.update([]);
    $('#elevation').prop('disabled', true);
    $('#services').val('');
  });

  $('#map').on('click', '.chartControl .close', function(e){
    $('.chartControl').css('opacity', 0);
    lidarViewer.linechart.update([]);
  });
});