var Mustache = require('mustache')
  , services = require('./services')

function Menu() {
  var self = this
  $.get('templates/menu.html', function(res){
    self.create(res)
  })
}

Menu.prototype.create = function(template) {
  var self = this
  this.menuControl = L.control({position: 'topright'})
  this.menuControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'layerMenu')
    this._div.className = this._div.className + " leaflet-control-layers"
    this._div.innerHTML = Mustache.render(template, services)
    this._div.firstChild.onmousedown = this._div.firstChild.ondblclick = L.DomEvent.stopPropagation
    $($(this._div).find('#statewide option').get(1)).prop('selected', true)
    L.DomEvent.disableClickPropagation(this._div)
    L.DomEvent.addListener(this._div, 'mouseenter', function (e) {
      self.lidarViewer.map.scrollWheelZoom.disable()
    })
    L.DomEvent.addListener(this._div, 'mouseleave', function (e) {
      self.lidarViewer.map.scrollWheelZoom.enable()
    })
    return this._div
  }
}

Menu.prototype.resizeMenu = function(){
  $('.layerMenu .options').css('max-height', $(window).height()-50)
}

Menu.prototype.addEventListeners = function() {
  var self = this

  $(window).resize(function(){
    self.resizeMenu()
  })

  $(this.menuControl._div).on('change', '.opacity-slider', function(e) {
    var opacity = $(this).val()/100
    self.lidarViewer.lidarLayer.setOpacity(opacity)
  })

  $(this.menuControl._div).on('change', '.services', function(e) {
    var service = $(this).val()
    var name = $(this).find('option:selected').text()
    var opacity = $('.opacity-slider').val()/100
    self.lidarViewer.addServiceLayer(service, name, opacity)
    $('.services').not(this).each(function(idx){
      $($(this).find('option').get(0)).prop('selected', true)
    })
  })

  $(this.menuControl._div).on('change', '#counties', function(e) {
    var county = $(this).val()
    self.lidarViewer.countylayer.eachLayer(function(layer) {
      if (layer.feature.properties.name === county) {
        self.lidarViewer.map.fitBounds(layer.getBounds())
      }
    })
  })

  $(this.menuControl._div).on('keydown', '#geocode-input', function(e) {
    if (e.keyCode === 13) self.lidarViewer.geocodeSubmit()
  })

  $(this.menuControl._div).on('click', '.geocode', function(e) {
    self.lidarViewer.geocodeSubmit()
  })

  $(this.menuControl._div).on('click', '.toggle', function(e) {
    if($('.layerMenu').hasClass('closed')) {
      $('.layerMenu').removeClass('closed')
      $(this).find('i').removeClass('fa-bars')
      $(this).find('i').addClass('fa-toggle-right')
    } else {
      $('.layerMenu').addClass('closed')
      $(this).find('i').removeClass('fa-toggle-right')
      $(this).find('i').addClass('fa-bars')
    }
    $('.options').toggle()
    $('.layerMenu .title h4').toggle()
  })
}

module.exports = new Menu()