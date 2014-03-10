var services = require('./services')

function Legend() {
  var self = this
  this.legendControl = L.control({position: 'bottomleft'})
  this.legendControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend')

    this._div.innerHTML += '<div class="status-legend"></div><div class="lidar-legend"><p class="legendDesc">Elevation (m)</p>'
      + '<img src="img/legend.jpg" alt="legend" class="legendImg" height="180px" width="30px">'
      + '<div class="legendLabel">'
      + '<p class="legendMax"></p>'
      + '<p class="legendMid"></p>'
      + '<p class="legendMin"></p></div>'

    self.elevation(services.statewide[0].service)
    this._div.firstChild.onmousedown = this._div.firstChild.ondblclick = L.DomEvent.stopPropagation
    L.DomEvent.disableClickPropagation(this._div)
    return this._div;
  }
}

Legend.prototype.showLidar = function(){
  $('.legend .status-legend').hide()
  $('.legend .lidar-legend').show()
}

Legend.prototype.showStatus = function(){
  $('.legend .lidar-legend').hide()
  $('.legend .status-legend').show().html('<img src="img/status.png" />')
}

Legend.prototype.elevation = function(service){
  $('.legend .lidar-legend img').attr('src', 'img/legend.JPG')
  this.updateElevation(service)
}

Legend.prototype.slope = function(){
  $('.legend .lidar-legend img').attr('src', 'img/SlopeColorRamp.JPG')
  $(this.legendControl._div).find('.legendDesc').html('Slope (Percent Rise)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('70')
}

Legend.prototype.aspect = function(){
  $('.legend .lidar-legend img').attr('src', 'img/AspectColorRamp.JPG')
  $(this.legendControl._div).find('.legendDesc').html('Aspect (Azimuth)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('360')
}

Legend.prototype.updateElevation = function (service) {
  var self = this
  var max, min, mid

  var update = function(min, max) {
    mid = (min+max)/2.0

    min = min.toFixed(2)
    max = max.toFixed(2)
    mid = mid.toFixed(2)

    $(self.legendControl._div).find('.legendDesc').html('Elevation (m)')
    $(self.legendControl._div).find('.legendMin').html(min)
    $(self.legendControl._div).find('.legendMid').html(mid)
    $(self.legendControl._div).find('.legendMax').html(max)
  }
  if(service.length == 0 || service == services.statewide[0].service){
    max = 1024
    min = -51
    update(min, max)
  } else {
    if(service.search("Stretched") >= 0 || service.search("shadedRelief") >= 0){
      $('.legend').css("visibility", "visible")

      url = self.services_base_url_rest
        + service
        + '?f=pjson'

      $.getJSON(url, function(res) {
        min = res.minValues[0]
        max = res.maxValues[0]
        update(min, max)
      })
    }
    else{
      $('.legend').css("visibility", "hidden")
    }
  }
}

module.exports = new Legend()