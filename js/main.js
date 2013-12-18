$(document).ready(function(){

  window.lidarViewer = new LidarViewer();

  $('#map').on('change', '.opacity-slider', function(e){
    var opacity = $(this).val()/100;
    lidarViewer.lidarLayer.setOpacity(opacity);
  });

  $('#map').on('change', '.services', function(e){
    var service = $(this).val();
    var name = $(this).find('option:selected').text();
    console.log(name);
    var opacity = $('.opacity-slider').val()/100;
    lidarViewer.addServiceLayer(service, opacity);
    lidarViewer.countylayer.eachLayer(function(layer){
      if(layer.feature.properties.name === name){
        lidarViewer.map.fitBounds(layer.getBounds());
      }
    });
    $('.services').not(this).each(function(idx){
      $($(this).find('option').get(0)).prop('selected', true);
    });
  });

  $('#map').on('change', '#counties', function(e){
    var county = $(this).val();
    lidarViewer.countylayer.eachLayer(function(layer){
      if(layer.feature.properties.name === county){
        lidarViewer.map.fitBounds(layer.getBounds());
      }
    });
  });

  $('#map').on('click', '.geocode', function(e){
    var term = $('#geocode-input').val();
    lidarViewer.geocoder.search(term, function(res){
      console.log(res);
      if(res){
        lidarViewer.map.setView(res, 13);
        var point = L.latLng(res);
        var marker = L.marker(point);
        lidarViewer.drawnItems.addLayer(marker);
        var popup = L.popup()
          .setContent('<i class="fa fa-refresh fa-spin"></i>');
        marker.bindPopup(popup).openPopup();
        lidarViewer.identifyContent(point, function(content){
          popup.setContent(content);
        });
      }
    })
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