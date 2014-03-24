/*
 * Author: Frank Rowe, ESRGC
 */

var geocoder = require('./Geocoder')
  , legend = require('./Legend')
  , menu = require('./Menu')
  , services = require('./services')
  , async = require('async')
  , Mustache = require('mustache')
  , proj4 = require('proj4')

function LidarViewer() {
  this.lidarGroup = new L.layerGroup()
  this.markerlayer = new L.LayerGroup()
  this.center = [38.8, -77.3]
  this.startZoom = 8
  this.identifyIcon = L.DivIcon.extend({
    options: {
        className: 'identify-div-icon',
        html: '',
        iconSize: [25, 55],
        iconAnchor: [12, 55]
    }
  })
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
    , 'MD iMap 6 Inch Imagery': imap_6in
    , 'MD iMap 6 Inch CIR Imagery': imap_6in_cir
  }

  this.countylayer = L.geoJson(this.mdcnty)
  this.mdbuffer = L.geoJson(this.mdbuffer)

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
  this.currentstatusgeojson = null

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
  this.futurestatusgeojson = null

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
    minZoom: 8,
    unloadInvisibleTiles: true,
    reuseTiles: true 
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

  this.map.on('baselayerchange', function(e) {
    self.lidarGroup.eachLayer(function(layer){
      layer.bringToFront()
    })
  })

  var hash = new L.Hash(this.map)
  L.control.scale().addTo(this.map)
  $('.leaflet-control-scale').addClass('hidden-xs')
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
  var marker = new L.marker(point, {icon: new this.identifyIcon({html: '<div class="value"></div>'})})
  self.markerlayer.addLayer(marker)
  marker.bindPopup(L.popup({offset: [0,-20]}).setContent('<img src="img/ajax.gif">'))
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
  var icon = new this.identifyIcon({html: '<div class="value">' + value.split('<br>')[0] + '</div>'})
  marker.setIcon(icon)
  $(marker._icon).width('auto')
  var width = $(marker._icon).width()
  $(marker._icon).css('margin-left', (width/2)*-1)
}

LidarViewer.prototype.createIdentifyValueForPopup = function(value, err) {
  var self = this
    , popup_value = ''
  if(err) {
    popup_value = 'Error loading data'
  } else {
    if(self.identifyType === 'elevation' || self.identifyType === 'hillshade') {
      if(!parseFloat(value)) {
        popup_value = value
      } else {
        var m = Math.round(parseFloat(value) * 100) / 100
          , ft =  Math.round((m * 3.28084) * 100) / 100
        m += 'm'
        ft += 'ft'
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
        var type = self.identifyType
        if(type === 'hillshade') type = 'elevation'
        metadata.identifyType = type.charAt(0).toUpperCase() + type.slice(1)
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
  var self = this
  this.lidarGroup.clearLayers()
  if(service) {
    this.layertype = service.split('/')[2]
    var layer = {}
    if (this.layertype === 'ImageServer') {
      this.lidarGroup.addLayer(L.tileLayer.wms(services.base_url + service + "/WMSServer", {
          layers: service.split('/')[1]
          , format: 'image/png'
          , transparent: true
          , attribution:'<a href="http://esrgc.org">ESRGC</a>'
          , opacity : opacity
          , pane: 'overlayPane'
        })
      )
    } else if (this.layertype === 'MapServer') {
      this.lidarGroup.addLayer(L.tileLayer(services.base_url_rest + service + '/tile/{z}/{y}/{x}/', {
          errorTileUrl: 'img/emptytile.png'
          , attribution:'<a href="http://esrgc.org">ESRGC</a>'
          , opacity: opacity
        })
      )
    }
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
    this.statewide = true
  } else if(this.activeService.indexOf('aspect') >= 0) {
    this.identifyType = 'aspect'
    this.statewide = true
  } else if(this.activeService.indexOf('hillshade') >= 0) {
    this.identifyType = 'hillshade'
    this.statewide = true
  } else {
    this.identifyType = 'elevation'
  }
  //use statewide layers for querying all but county elevation
  if(this.identifyType !== 'elevation' || this.statewide){
    for(var i = 0; i < services.statewide.length; i++){
      if(services.statewide[i].type === this.identifyType) {
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

  var stateplane = '+proj=lcc +lat_1=39.45 +lat_2=38.3 +lat_0=37.66666666666666 +lon_0=-77 +x_0=400000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'
  var esriwebmercator = '+proj=lcc +lat_1=39.45 +lat_2=38.3 +lat_0=37.66666666666666 +lon_0=-77 +x_0=400000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'

  var coords = proj4(stateplane,[latlng.lng, latlng.lat])
  console.log(coords)

  var data = {
    geometryType: 'esriGeometryPoint',
    geometry:'{"x":' + latlng.lng + ',"y":' + latlng.lat + ',"spatialReference":{"wkid":4265}}',
    //geometry:'{"x":' + coords[0] + ',"y":' + coords[1] + ',"spatialReference":{"wkid":26985}}',
    //pixelSize: '{"x":611.4962262812483,"y":611.4962262812473,"spatialReference":{"wkid":102100,"latestWkid":3857}}',
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