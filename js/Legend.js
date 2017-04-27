var services = require('./services')

function Legend() {
  var self = this
  $.get('templates/legend.tmpl', function(res) {
    self.create(res)
  })
}

Legend.prototype.create = function(template) {
  var self = this
  this.legendControl = L.control({ position: 'bottomleft' })
  this.legendControl.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info legend')
    this._div.className = this._div.className + ' hidden-xs'
    this._div.innerHTML += template
    this._div.firstChild.onmousedown = this._div.firstChild.ondblclick = L.DomEvent.stopPropagation
    L.DomEvent.disableClickPropagation(this._div)
    return this._div;
  }
}

Legend.prototype.showLidar = function() {
  $('.legend .status-legend').hide()
  $('.legend .futureAcq-legend').hide();
  $('.legend .lidar-legend').show()
}

Legend.prototype.showStatus = function() {
  $('.legend .lidar-legend').hide()
  $('.legend .futureAcq-legend').hide();
  $('.legend .status-legend').show(); //.html('<img src="img/status.png" />')
}

Legend.prototype.showFutureAcq = function() {
  $('.legend .status-legend').hide()
  $('.legend .lidar-legend').hide()
  $('.legend .futureAcq-legend').show()
};

Legend.prototype.update = function(type, service) {
  if (type == 'elevation') {
    this.elevation(service)
  } else if (type === 'slope') {
    this.slope()
  } else if (type === 'aspect') {
    this.aspect()
  } else if (type === 'hillshade') {
    this.hillshade()
  }
}

Legend.prototype.elevation = function(service) {
  $('.legend').removeClass('hidden')
  console.log(service)
  if (service.indexOf('statewide') >= 0) {
    $('.legend .lidar-legend img').attr('src', 'img/ColorRamp.jpg')
  } else {
    $('.legend .lidar-legend img').attr('src', 'img/legend.jpg')
  }
  this.updateElevation(service)
}

Legend.prototype.slope = function() {
  $('.legend').removeClass('hidden')
  $('.legend .lidar-legend img').attr('src', 'img/slopeLegend.jpg')
  $(this.legendControl._div).find('.legendDesc').html('Slope (Percent Rise)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('70')
}

Legend.prototype.aspect = function() {
  $('.legend').removeClass('hidden')
  $('.legend .lidar-legend img').attr('src', 'img/aspectLegend.jpg')
  $(this.legendControl._div).find('.legendDesc').html('Aspect (Azimuth)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('360')
}

Legend.prototype.hillshade = function() {
  console.log('hillshade legend')
  $('.legend').addClass('hidden')
}

Legend.prototype.updateElevation = function(service) {
  var self = this
  var max, min, mid
  var update = function(min, max) {
    mid = (min + max) / 2.0

    min = min.toFixed(2)
    max = max.toFixed(2)
    mid = mid.toFixed(2)

    $(self.legendControl._div).find('.legendDesc').html('Elevation (m)')
    $(self.legendControl._div).find('.legendMin').html(min)
    $(self.legendControl._div).find('.legendMid').html(mid)
    $(self.legendControl._div).find('.legendMax').html(max)
  }
  if (service.length == 0 || service == services.statewide[0].identify) {
    max = 1024
    min = -51
    update(min, max)
  } else {
    url = services.base_url_rest + service + '?f=pjson'

    $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
    }).done(function(res) {
      if (res.error) {
        $('.legend').addClass('hidden')
      } else {
        min = res.minValues[0]
        max = res.maxValues[0]
        update(min, max)
      }
    }).fail(function(res) {
      $('.legend').addClass('hidden')
    })
  }
}

module.exports = new Legend()
