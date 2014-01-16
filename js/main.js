/*
 * Author: Frank Rowe, ESRGC
 */

$(document).ready(function(){

  window.lidarViewer = new LidarViewer()

  $('#map').on('change', '.opacity-slider', function(e) {
    var opacity = $(this).val()/100
    lidarViewer.lidarLayer.setOpacity(opacity)
  })

  $('#map').on('change', '.services', function(e) {
    var service = $(this).val()
    var name = $(this).find('option:selected').text()
    var opacity = $('.opacity-slider').val()/100
    lidarViewer.addServiceLayer(service, opacity)
    lidarViewer.countylayer.eachLayer(function(layer){
      if (layer.feature.properties.name === name) {
        lidarViewer.map.fitBounds(layer.getBounds())
      }
    })
    $('.services').not(this).each(function(idx){
      $($(this).find('option').get(0)).prop('selected', true)
    })
  })

  $('#map').on('change', '#counties', function(e) {
    var county = $(this).val()
    lidarViewer.countylayer.eachLayer(function(layer) {
      if (layer.feature.properties.name === county) {
        lidarViewer.map.fitBounds(layer.getBounds())
      }
    })
  })

  $('#map').on('keydown', '#geocode-input', function(e) {
    if (e.keyCode === 13) lidarViewer.geocodeSubmit()
  })

  $('#map').on('click', '.geocode', function(e) {
    lidarViewer.geocodeSubmit()
  })

  $('#map').on('click', '.toggle', function(e) {
    $('.options').toggle()
    $('.layerMenu .title h4').toggle()
  })

  $("#clear").click(function() {
    lidarViewer.layerGroup.clearLayers()
    lidarViewer.drawnItems.clearLayers()
    lidarViewer.linechart.update([])
    $('#elevation').prop('disabled', true)
    $('#services').val('')
  })

  $('#map').on('click', '.chartControl .close', function(e) {
    $('.chartControl').hide()
    lidarViewer.linechart.update([])
  })
})