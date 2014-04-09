var Mustache = require('mustache')
  , services = require('./services')

function Menu() {
  var self = this
  $.get('templates/menu.tmpl', function(res){
    self.create(res)
  })
}

Menu.prototype.create = function(template) {
  var self = this
  this.menuControl = L.control({position: 'topright'})
  this.menuControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info layerMenu')
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
  $('.layerMenu .options').css('max-height', $(window).height()-55)
}

Menu.prototype.close = function(el){
  $('.layerMenu').addClass('closed')
  $(this.menuControl._div).find('.toggle i').removeClass('fa-toggle-right')
  $(this.menuControl._div).find('.toggle i').addClass('fa-bars')
  $('.options').hide()
  $('.layerMenu .title h4').hide()
}

Menu.prototype.open = function(el){
  $('.layerMenu').removeClass('closed')
  $(el).find('i').removeClass('fa-bars')
  $(el).find('i').addClass('fa-toggle-right')
  $('.options').show()
  $('.layerMenu .title h4').show()
}

Menu.prototype.addEventListeners = function() {
  var self = this

  $(".opacity-slider").slider({
    min: 0,
    max: 100,
    value: 100,
    slide: function(event, ui) {
      var opacity = ui.value/100
      self.lidarViewer.lidarGroup.eachLayer(function(layer){
        layer.setOpacity(opacity)
      })
    }
  })

  $(window).resize(function(){
    self.resizeMenu()
  })

  $(this.menuControl._div).on('change', '.services', function(e) {
    var service = $(this).val()
    var name = $(this).find('option:selected').text()
    var opacity = $('.opacity-slider').slider('value')/100
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

  $(this.menuControl._div).on('click', '.clearmarkers', function(e) {
    self.lidarViewer.markerlayer.clearLayers()
  })

  $(this.menuControl._div).on('click', '.toggle', function(e) {
    if($('.layerMenu').hasClass('closed')) {
      self.open()
    } else {
      self.close()
    }
  })
}

module.exports = new Menu()