(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Author: Frank Rowe, ESRGC
 */

function GeoCoder() {
  this.url = 'http://mdimap.us/ArcGIS/rest/services/'
    + 'GeocodeServices/MD.State.MDCascadingLocatorWithZIPCodes/GeocodeServer/'
    + 'findAddressCandidates'
}

GeoCoder.prototype.search = function(term, next) {
  var query = {
    SingleLine: term
    , outSR: 4326
    , f: 'pjson'
  }
  $.ajax({
    type : "GET"
    , dataType : "jsonp"
    , data: query
    , url : this.url
    , success: function(res) {
      if (res.candidates.length) {
        var latlng = [
          res.candidates[0].location.y
          , res.candidates[0].location.x
        ]
        next(latlng)
      } else {
        next(false)
      }
    }
  })
}

module.exports = new GeoCoder()
},{}],2:[function(require,module,exports){
var services = require('./services')

function Legend() {
  var self = this
  $.get('templates/legend.tmpl', function(res){
    self.create(res)
  })
}

Legend.prototype.create = function(template) {
  var self = this
  this.legendControl = L.control({position: 'bottomleft'})
  this.legendControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend')
    this._div.innerHTML += template
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

Legend.prototype.update = function(type, service) {
  if(type == 'elevation') {
    this.elevation(service)
  } else if (type === 'slope') {
    this.slope()
  } else if (type === 'aspect') {
    this.aspect()
  } else if (type === 'hillshade') {
    this.hillshade
  }
}

Legend.prototype.elevation = function(service){
  $('.legend').show()
  $('.legend .lidar-legend img').attr('src', 'img/legend.jpg')
  this.updateElevation(service)
}

Legend.prototype.slope = function(){
  $('.legend').show()
  $('.legend .lidar-legend img').attr('src', 'img/SlopeColorRamp.jpg')
  $(this.legendControl._div).find('.legendDesc').html('Slope (Percent Rise)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('70')
}

Legend.prototype.aspect = function(){
  $('.legend').show()
  $('.legend .lidar-legend img').attr('src', 'img/AspectColorRamp.jpg')
  $(this.legendControl._div).find('.legendDesc').html('Aspect (Azimuth)')
  $(this.legendControl._div).find('.legendMin').html('0')
  $(this.legendControl._div).find('.legendMid').html('')
  $(this.legendControl._div).find('.legendMax').html('360')
}

Legend.prototype.hillshade = function(){
  $('.legend').hide()
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
  if(service.length == 0 || service == services.statewide[0].identify){
    max = 1024
    min = -51
    update(min, max)
  } else {
    $('.legend').css("visibility", "visible")

    url = services.base_url_rest
      + service
      + '?f=pjson'

    $.getJSON(url, function(res) {
      min = res.minValues[0]
      max = res.maxValues[0]
      update(min, max)
    })
  }
}

module.exports = new Legend()
},{"./services":6}],3:[function(require,module,exports){
/*
 * Author: Frank Rowe, ESRGC
 */

var geocoder = require('./Geocoder')
  , legend = require('./Legend')
  , menu = require('./Menu')
  , services = require('./services')
  , async = require('async')
  , Mustache = require('mustache')

function LidarViewer() {
  this.layer = false
  this.identifyElevationTool = false
  this.hasLabels = true
  this.popup = new L.popup()
  this.lidarLayer = false
  this.lidarGroup = new L.layerGroup()
  this.markerlayer = new L.LayerGroup()
  this.center = [38.8, -77.3]
  this.startZoom = 8
  this.polystyle = {
    color: '#333'
    , fillOpacity: 0
    , weight: 2
  }
}

LidarViewer.prototype.start = function() {
  var self = this
  $.ajaxSetup({ cache: false })
  async.parallel([
    function(next) {
      $.getJSON('data/mdcntybuffer.geojson', function(res) {
        self.mdcnty = res
        next(null)
      })
    }
    , function(next) {
      $.getJSON('data/mdbuffer.geojson', function(res) {
        self.mdbuffer = res
        next(null)
      })
    }
    , function(next) {
      $.getJSON('data/metadata.json', function(res) {
        self.metadata = res
        next(null)
      })
    }
    , function(next) {
      $.getJSON('data/currentstatus.geojson', function(res) {
        self.currentstatusgeojson = res
        next(null)
      })
    }
    , function(next) {
      $.get('templates/identifyPopup.tmpl', function(res) {
        self.identifyPopupTemplate = res
        next(null)
      })
    }
    , function(next) {
      $.getJSON('data/futurestatus.geojson', function(res) {
        self.futurestatusgeojson = res
        next(null)
      })
    }
  ]
  , function(err, res) {
    $.ajaxSetup({ cache: true })
    self.makeMap()
  })
}

LidarViewer.prototype.makeMap = function() {
  var self = this

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png')
    , world_imagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/')
    , gray = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.hd7o0kfk/{z}/{x}/{y}.png')
    , imap_6in = L.tileLayer.wms("http://mdimap.us/arcgis/services/ImageryBaseMapsEarthCover/MD.State.6InchImagery/MapServer/WMSServer", {
      layers: '0',
      format: 'image/png',
      transparent: true,
      attribution: "MD iMap"
    })
    , imap_6in_cir = L.tileLayer.wms("http://mdimap.us/arcgis/services/ImageryBaseMapsEarthCover/MD.State.6InchCIRImagery/MapServer/WMSServer", {
      layers: '0',
      format: 'image/png',
      transparent: true,
      attribution: "MD iMap"
    })

  this.baseMaps = {
    "Gray": gray
    , "World Imagery": world_imagery
    , "World Imagery with Labels": mapboxsat
    , 'iMap 6 Inch Imagery': imap_6in
    , 'iMap 6 Inch CIR Imagery': imap_6in_cir
  }

  this.countylayer = L.geoJson(this.mdcnty, { style: this.polystyle })
  this.mdbuffer = L.geoJson(this.mdbuffer, { style: this.polystyle })

  this.countyoverlay = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.CountyCompare/{z}/{x}/{y}.png', {
    pane: 'overlayPane',
    errorTileUrl: 'img/emptytile.png'
  }).on('add', function(e){
    self.countyoverlay.bringToFront()
  })
  this.watershedoverlay = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.watersheds2/{z}/{x}/{y}.png', {
    pane: 'overlayPane',
    errorTileUrl: 'img/emptytile.png'
  }).on('add', function(e){
    self.watershedoverlay.bringToFront()
  })

  var template_current = '<h6>County: {COUNTY}</h6>'+
    '<h6>Date: {DATE}</h6>'+
    '<h6>Partners: {PROJ_PARTN}</h6>'+
    '<h6>Point spacing: {POINT_SPAC}</h6>'+
    '<h6>Vertical Accuracy: {VERT_ACC}</h6>'+
    '<h6>Vertical Datum: {VERT_DATUM}</h6>'

  var template_future = '<h6>County: {NAME}</h6>'+
    '<h6>Delivery: {DELIVERY}</h6>' +
    '<h6>Acquistion: {ACQ_DETAIL}</h6>'

  var statuscolors = {
    '2012': '#018571',
    '2011': '#52AA9D',
    '2008': '#A4D0C9',
    '2007': '#F5F5F5',
    '2006': '#DBC4AC',
    '2005': '#C09263',
    '2004': '#A6611A'
  }

  this.currentstatus = L.geoJson(this.currentstatusgeojson, {
    style: function (feature) {
      var color = statuscolors[feature.properties.DATE]
      return { fillColor: color, weight: 1, color: '#333', fillOpacity: 1 }
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(L.Util.template(template_current, feature.properties))
    }
  }).on('add', function(e){
    if(self.map.hasLayer(self.futurestatus)){
      self.futurestatus.bringToFront()
    }
    legend.showStatus()
  }).on('remove', function(e){
    if(!self.map.hasLayer(self.futurestatus)){
      legend.showLidar()
    }
  })

  this.futurestatus = L.geoJson(this.futurestatusgeojson, {
    style: function (feature) {
      return { fillColor: '#FFD700', weight: 1, color: '#333', fillOpacity: 1 }
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(L.Util.template(template_future, feature.properties))
    }
  }).on('add', function(e){
    self.futurestatus.bringToFront()
    legend.showStatus()
  }).on('remove', function(e){
    if(!self.map.hasLayer(self.currentstatus)){
      legend.showLidar()
    }
  })

  this.overlays = {
    "Counties": this.countyoverlay
    , "Watersheds": this.watershedoverlay
    , "Future Acquisitions": this.futurestatus
    , "Most Recent Acquisitions": this.currentstatus
  }

  this.map = new L.Map('map', {
    layers: [
      gray
      , this.lidarGroup
      , this.markerlayer
    ],
    zoomControl: false,
    minZoom: 8
  })
  
  this.map.setView(this.center, this.startZoom, {animate: false})
  
  self.clicked = false
  this.map.on('click', function(e) {
    if(self.clicked) {
      self.clicked = false
      return false
    } else {
      self.clicked = true
      setTimeout(function(){
        if(self.clicked) {
          self.identify(e.latlng)
          self.clicked = false
        } 
      }, 400)
    }
  })

  this.map.on('dblclick', function(e){
    return false
  })

  var hash = new L.Hash(this.map)
  L.control.scale().addTo(this.map)
  L.control.zoomControlCenter({
    center: this.map.getCenter()
  }).addTo(this.map)
  menu.lidarViewer = this
  menu.menuControl.addTo(this.map)
  menu.addEventListeners()
  menu.resizeMenu()
  legend.legendControl.addTo(this.map)

  L.control.layersCustom(this.baseMaps, this.overlays, {
    collapsed: false
    , click: false
  }).addTo(this.map, $('.custom-layer-menu .section-content')[0])

  self.activeService = services.statewide[0].service
  self.addServiceLayer(this.activeService, services.statewide[0].name, 1)
}

LidarViewer.prototype.identify = function(point) {
  var self = this
  var marker = new L.marker(point)
  self.markerlayer.addLayer(marker)
  marker.bindPopup('<img src="img/ajax.gif">').openPopup()
  if(this.statewide) {
    self.identifyContent(point, function(content) {
      if(content) {
        marker.getPopup().setContent(content)
        self._identifyValue(point, function(value, err){
          var popup_value = self.createIdentifyValueForPopup(value, err)
          self.insertIdentifyValueIntoPopup(popup_value, marker)
        })
      } else {
        marker.getPopup().setContent('No Data')
      }
    })
  } else {
    self._identifyValue(point, function(value, err){
      if(value === 'NoData') {
        marker.getPopup().setContent('No Data')
      } else {
        self.identifyContent(point, function(content) {
          if(content) {
            marker.getPopup().setContent(content)
            var popup_value = self.createIdentifyValueForPopup(value, err)
            self.insertIdentifyValueIntoPopup(popup_value, marker)
          } else {
            marker.getPopup().setContent('No Data')
          }
        })
      }
    })
  }
}

LidarViewer.prototype.insertIdentifyValueIntoPopup = function(value, marker) {
  var content = $(marker.getPopup().getContent())
  var popupContent = $('<div/>').html(content).contents()
  $(popupContent.find('.identify-value')[0]).html(value)
  marker.getPopup().setContent(popupContent[0].outerHTML)
}

LidarViewer.prototype.createIdentifyValueForPopup = function(value, err) {
  var self = this
    , popup_value = ''
  if(err) {
    popup_value = 'Error loading data'
  } else {
    if(self.identifyType === 'elevation') {
      if(!parseFloat(value)) {
        popup_value = value
      } else {
        var m = Math.round(parseFloat(value) * 100) / 100
          , ft =  Math.round((m * 3.28084) * 100) / 100
        m += ' m'
        ft += ' ft'
        popup_value = m + '<br>' + ft
      }
    } else if(self.identifyType === 'slope') {
      popup_value = value + '%'
    } else if(self.identifyType === 'aspect') {
      popup_value = value + '&deg;'
    }
  }
  return popup_value
}

LidarViewer.prototype.identifyContent = function (latlng, next) {
  var self = this
  var metadata = self.getMetadataFromPoint(latlng)
  if(metadata) {
    for (var i = 0; i < services.elevation.length; i++) {
      if (metadata.County === services.elevation[i].name) {
        metadata.identifyType = self.identifyType.charAt(0).toUpperCase() + self.identifyType.slice(1)
        metadata.lat = latlng.lat.toFixed(3)
        metadata.lng = latlng.lng.toFixed(3)
        var content = Mustache.render(self.identifyPopupTemplate, metadata)
        next(content)
      }
    }
  } else {
    next(false)
  }
}

LidarViewer.prototype.getMetadataFromPoint = function (point) {
  var inMaryland = leafletPip.pointInLayer(point, this.mdbuffer)
  if(inMaryland.length) {
    var countyname = ''
    if(this.statewide) {
      var results = leafletPip.pointInLayer(point, this.countylayer)
      if (results.length) {
        countyname = results[0].feature.properties.name
      } else {
        return false
      }
    } else {
      countyname = this.activeCounty
    }
    for (var i = 0; i < this.metadata.length; i++) {
      if (this.metadata[i].County === countyname) {
        return this.metadata[i]
      }
    }
  } else {
    return false
  }
}

LidarViewer.prototype.addServiceLayer = function (service, name, opacity) {
  this.lidarGroup.clearLayers()
  if(service) {
    this.layertype = service.split('/')[2]
    var layer = {}
    if (this.layertype === 'ImageServer') {
      layer = L.tileLayer.wms(services.base_url + service + "/WMSServer", {
        layers: service.split('/')[1]
        , format: 'image/png'
        , transparent: true
        , attribution: "ESRGC"
        , opacity : opacity
        , pane: 'overlayPane'
      })
    } else if (this.layertype === 'MapServer') {
      layer = L.tileLayer(services.base_url_rest + service + '/tile/{z}/{y}/{x}/', {
        pane: 'overlayPane',
        errorTileUrl: 'img/emptytile.png',
        opacity: opacity
      })
    }
    this.lidarGroup.addLayer(layer)
    this.lidarLayer = layer
    this.activeService = service
    this.identifyService = this.setIdentifyService(name)
    legend.update(this.identifyType, this.identifyService)
    this.lidarGroup.eachLayer(function(l) {
      l.bringToFront()
    })
  }
}

LidarViewer.prototype.zoomToCounty = function(name) {
  var self = this
  this.countylayer.eachLayer(function(layer){
    if(layer.feature.properties.name === name){
      self.map.fitBounds(layer.getBounds(), { animate: false })
    }
  })
}

LidarViewer.prototype.zoomToState = function() {
  this.map.setView(this.center, this.startZoom, {animate: false})
}

LidarViewer.prototype.setIdentifyService = function(name) {
  if(name.indexOf('Statewide') >= 0) {
    this.statewide = true
    this.zoomToState()
  } else {
    this.statewide = false
    this.activeCounty = name
    this.zoomToCounty(name)
  }
  if(this.activeService.indexOf('slope') >= 0) {
    this.identifyType = 'slope'
  } else if(this.activeService.indexOf('aspect') >= 0) {
    this.identifyType = 'aspect'
  } else if(this.activeService.indexOf('hillshade') >= 0) {
    this.identifyType = 'hillshade'
  } else {
    this.identifyType = 'elevation'
  }
  if(this.statewide){
    for(var i = 0; i < services.statewide.length; i++){
      if(services.statewide[i].name === name) {
        return services.statewide[i].identify
      }
    }
  } else {
    for(var i = 0; i < services[this.identifyType].length; i++){
      if(services[this.identifyType][i].name === name) {
        return services[this.identifyType][i].identify
      }
    }
  }
}

LidarViewer.prototype._identifyValue = function (latlng, next) {
  var self = this
    , service
  var id_url = services.base_url_rest + self.identifyService + '/identify'
  var data = {
    geometryType: 'esriGeometryPoint',
    geometry:'{"x":' + latlng.lng + ',"y":' + latlng.lat + ',"spatialReference":{"wkid":4265}}',
    f: 'json',
    returnGeometry: false,
    returnCatalogItems: false
  }
  $.ajax({
    url: id_url,
    type: "GET",
    data: data,
    dataType: "jsonp"
  }).done(function(res){
    var value = res.value
    next(value, null)
  }).fail(function(res){
    next(null, 'Error')
  })
}

LidarViewer.prototype.getPixelValue = function(res) {
  var value
  if (this.layertype === 'ImageServer') {
    value = res.value
  } else if (this.layertype === 'MapServer') {
    value = res.results[0].attributes['Pixel Value']
  }
  return value
}

LidarViewer.prototype.geocodeSubmit = function() {
  var self = this
  var term = $('#geocode-input').val()
  geocoder.search(term, function(res) {
    if (res) {
      $('.geocode-error').html('')
      self.map.setView(res, 13)
      var point = L.latLng(res)
      self.identify(point)
    } else {
      $('.geocode-error').html('<p>Address Not Found</p>')
    }
  })
}

module.exports = new LidarViewer()
},{"./Geocoder":1,"./Legend":2,"./Menu":4,"./services":6,"async":7,"mustache":9}],4:[function(require,module,exports){
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

  $(".opacity-slider").slider({
    min: 0,
    max: 100,
    value: 100,
    slide: function(event, ui) {
      var opacity = ui.value/100
      self.lidarViewer.lidarLayer.setOpacity(opacity)
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
},{"./services":6,"mustache":9}],5:[function(require,module,exports){
/*
 * Author: Frank Rowe, ESRGC
 */

var lidarViewer = require('./LidarViewer')

$(function(){
  lidarViewer.start()
})

},{"./LidarViewer":3}],6:[function(require,module,exports){
module.exports = {
  "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "Statewide/MD_statewide_shadedRelief_m/MapServer",
      "identify": "Elevation/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Statewide Aspect",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_statewide_aspect_m/ImageServer"
    },
    {
      "name": "Statewide Slope",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_statewide_slope_m/ImageServer"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_statewide_dem_m/ImageServer"
    }
  ],
  "slope": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_allegany_slope_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_annearundel_slope_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_baltimore_slope_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_slope_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_calvert_slope_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_caroline_slope_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_carroll_slope_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_cecil_slope_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_charles_slope_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_dorchester_slope_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_frederick_slope_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_garrett_slope_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_harford_slope_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_howard_slope_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_kent_slope_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_montgomery_slope_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_princegeorges_slope_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_queenannes_slope_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_somerset_slope_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_stmarys_slope_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_talbot_slope_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_washington_slope_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_slope_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_wicomico_slope_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_worcester_slope_m/ImageServer"
    }
  ],
  "elevation": [
    {
      "name": "Allegany",
      "service": "ShadedRelief/MD_allegany_shadedRelief/MapServer",
      "identify": "Elevation/MD_allegany_dem_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "ShadedRelief/MD_annearundel_shadedRelief",
      "identify": "Elevation/MD_annearundel_demStretched_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "ShadedRelief/MD_baltimore_shadedRelief/MapServer",
      "identify": "Elevation/MD_baltimore_demStretched_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "ShadedRelief/MD_baltimorecity_shadedRelief/MapServer",
      "identify": "Elevation/MD_baltimorecity_demStretched_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "ShadedRelief/MD_calvert_shadedRelief/MapServer",
      "identify": "Elevation/MD_calvert_demStretched_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "ShadedRelief/MD_caroline_shadedRelief/MapServer",
      "identify": "Elevation/MD_caroline_demStretched_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "ShadedRelief/MD_carroll_shadedRelief/MapServer",
      "identify": "Elevation/MD_carroll_demStretched_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Elevation/MD_cecil_demStretched_m/ImageServer",
      "identify": "Elevation/MD_cecil_demStretched_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Elevation/MD_charles_demStretched_m/ImageServer",
      "identify": "Elevation/MD_charles_demStretched_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Elevation/MD_dorchester_demStretched_m/ImageServer",
      "identify": "Elevation/MD_dorchester_demStretched_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Elevation/MD_frederick_demStretched_m/ImageServer",
      "identify": "Elevation/MD_frederick_demStretched_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Elevation/MD_garrett_demStretched_m/ImageServer",
      "identify": "Elevation/MD_garrett_demStretched_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Elevation/MD_harford_demStretched_m/ImageServer",
      "identify": "Elevation/MD_harford_demStretched_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Elevation/MD_howard_demStretched_m/ImageServer",
      "identify": "Elevation/MD_howard_demStretched_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Elevation/MD_kent_demStretched_m/ImageServer",
      "identify": "Elevation/MD_kent_demStretched_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Elevation/MD_montgomery_demStretched_m/ImageServer",
      "identify": "Elevation/MD_montgomery_demStretched_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Elevation/MD_princegeorges_demStretched_m/ImageServer",
      "identify": "Elevation/MD_princegeorges_demStretched_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Elevation/MD_queenannes_demStretched_m/ImageServer",
      "identify": "Elevation/MD_queenannes_demStretched_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Elevation/MD_somerset_demStretched_m/ImageServer",
      "identify": "Elevation/MD_somerset_demStretched_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Elevation/MD_stmarys_demStretched_m/ImageServer",
      "identify": "Elevation/MD_stmarys_demStretched_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Elevation/MD_talbot_demStretched_m/ImageServer",
      "identify": "Elevation/MD_talbot_demStretched_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Elevation/MD_washington_demStretched_m/ImageServer",
      "identify": "Elevation/MD_washington_demStretched_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Elevation/MD_washingtonDC_demStretched_m/ImageServer",
      "identify": "Elevation/MD_washingtonDC_demStretched_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Elevation/MD_wicomico_demStretched_m/ImageServer",
      "identify": "Elevation/MD_wicomico_demStretched_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Elevation/MD_worcester_demStretched_m/ImageServer",
      "identify": "Elevation/MD_worcester_demStretched_m/ImageServer"
    }
  ],
  "aspect": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_allegany_aspect_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_annearundel_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_baltimore_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_aspect_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_calvert_aspect_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_caroline_aspect_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_carroll_aspect_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_cecil_aspect_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_charles_aspect_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_dorchester_aspect_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_frederick_aspect_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_garrett_aspect_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_harford_aspect_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_howard_aspect_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_kent_aspect_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_montgomery_aspect_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_princegeorges_aspect_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_queenannes_aspect_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_somerset_aspect_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_stmarys_aspect_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_talbot_aspect_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_washington_aspect_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_aspect_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_wicomico_aspect_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_worcester_aspect_m/ImageServer"
    }
  ],
  "hillshade": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_allegany_hillshade_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_annearundel_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_baltimore_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_hillshade_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_calvert_hillshade_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_caroline_hillshade_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_carroll_hillshade_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_cecil_hillshade_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_charles_hillshade_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_dorchester_hillshade_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_frederick_hillshade_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_garrett_hillshade_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_harford_hillshade_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_howard_hillshade_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_kent_hillshade_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_montgomery_hillshade_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_princegeorges_hillshade_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_queenannes_hillshade_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_somerset_hillshade_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_stmarys_hillshade_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_talbot_hillshade_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_washington_hillshade_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_hillshade_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_wicomico_hillshade_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_worcester_hillshade_m/ImageServer"
    }
  ]
}

},{}],7:[function(require,module,exports){
(function (process){
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor !== Array) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

}).call(this,require("/Users/fsrowe/Documents/Web/maps/md-lidar-viewer/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/fsrowe/Documents/Web/maps/md-lidar-viewer/node_modules/grunt-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":8}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],9:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all template text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices
   * in the original template of the token, respectively.
   *
   * Tokens that are the root node of a subtree contain two more elements: an
   * array of tokens in the subtree and the index in the original template at which
   * the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null) buffer += this.renderTokens(this.parse(value), context, partials, value);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

},{}]},{},[5])