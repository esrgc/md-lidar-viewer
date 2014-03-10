/*
 * Author: Frank Rowe, ESRGC
 */

var geocoder = require('./Geocoder')
  , legend = require('./Legend')
  , services = require('./services')
  , async = require('async')

function LidarViewer() {
  this.layer = false
  this.identifyElevationTool = false
  this.hasLabels = true
  this.popup = new L.popup()
  this.lidarLayer = false
  this.lidarGroup = new L.layerGroup()
  this.drawnItems = new L.FeatureGroup()
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
      , this.drawnItems
    ],
    zoomControl: false,
    minZoom: 8
  })
  
  this.map.setView([38.8, -77.3], 8)
  
  this.map.on('click', function(e) {
    self.identify(e.latlng)
  })

  var hash = new L.Hash(this.map)
  L.control.scale().addTo(this.map)
  L.control.zoomControlCenter({
    center: this.map.getCenter()
  }).addTo(this.map)

  this.addControls()
  this.resizeMenu()

  L.control.layersCustom(this.baseMaps, this.overlays, {
    collapsed: false
    , click: false
  }).addTo(this.map, $('.custom-layer-menu .section-content')[0])

  self.activeService = services.statewide[0].service
  self.addServiceLayer(self.activeService, 1)
}

LidarViewer.prototype.resizeMenu = function(){
  $('.layerMenu .options').css('max-height', $(window).height()-50)
}

LidarViewer.prototype.addControls = function() {
  var self = this
  var options = ''

  options += '<div class="title"><h4>MD Lidar Viewer</h4>'
    + '<div class="toggle"><i class="fa fa-toggle-right"></i></div></div>'
    + '<div class="options">'

  var lidar_menu_section = '<div class="section">'
    + '<div class="section-title">Lidar Layers</div>'
    + '<div class="section-content">'
    + '<div class="layer-select">'
    + '<div class="layer-name">Statewide</div>'
    + '<select id="statewide" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < services.statewide.length; i++) {
    lidar_menu_section += '<option value="'
      + services.statewide[i].service+ '">'
      + services.statewide[i].name+ '</option>'
  }
  lidar_menu_section += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Shaded Relief</div>'
    + '<select id="county-stretched" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < services.stretched.length; i++) {
    lidar_menu_section += '<option value="'
      + services.stretched[i].service + '">'
      + services.stretched[i].name + '</option>'
  }
  lidar_menu_section += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Slope</div>'
    + '<select id="county-slope" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < services.slope.length; i++) {
    lidar_menu_section += '<option value="'
      + services.slope[i].service + '">'
      + services.slope[i].name + '</option>'
  }
  lidar_menu_section += '</select></div></div></div>'

  options += lidar_menu_section

  var layer_menu_section = '<div class="custom-layer-menu section">'
    + '<div class="section-title">Base Maps and Overlays</div>'
    + '<div class="section-content"></div>'
    + '</div>'

  options += layer_menu_section

  var tools_menu_section = '<div class="section">'
    + '<div class="section-title">Tools</div>'
    + '<div class="section-content">'
    + '<div class="opacity-control">'
    + '<div class="layer-name">Lidar Opacity</div>'
    + '<input type="range" name="points" min="0" max="100"'
    + ' class="opacity-slider" value="100">'
    + '</div>'
    + '<div class="addressControl">'
    + '<div class="layer-name">Address or Place Name Search</div><div class="row">'
    + '<div class="col-lg-12">'
    + '<div class="input-group">'
    + '<input type="text" class="form-control" '
    + 'id="geocode-input" placeholder="1101 Camden Ave">'
    + '<span class="input-group-btn">'
    + '<button type="submit" class="geocode btn btn-default" type="button">Search</button>'
    + '</span>'
    + '</div></div></div>'
    + '<div class="row"><div class="col-lg-12">'
    + '<div class="geocode-error"></div>'
    + '</div></div></div></div>'

  options += tools_menu_section

  var instructions_menu_section = '<div class="section">'
    + '<div class="section-title">Notes</div>'
    + '<div class="section-content">'
    + '<div class="instructions"><ul>'
    + '<li>Click anywhere on the map to identify values.</li>'
    + '<li>Elevation units represent bare earth values.</li>'
    + '<li><a href="' + services.base_url_rest + '" target="_blank">Services Directory</a></li>'
    + '</ul></div>'

  options += instructions_menu_section

  var layerMenu = L.control({position: 'topright'})
  layerMenu.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'layerMenu')
      this._div.className = this._div.className + " leaflet-control-layers"
      this._div.innerHTML = options
      this._div.firstChild.onmousedown = this._div.firstChild.ondblclick = L.DomEvent.stopPropagation
      L.DomEvent.disableClickPropagation(this._div)
      L.DomEvent.addListener(this._div, 'mouseenter', function (e) {
        self.map.scrollWheelZoom.disable()
      })
      L.DomEvent.addListener(this._div, 'mouseleave', function (e) {
        self.map.scrollWheelZoom.enable()
      })
      return this._div
  }
  layerMenu.addTo(this.map)
  $($('#statewide option').get(1)).prop('selected', true)

  legend.legendControl.addTo(this.map);
}

LidarViewer.prototype.identify = function(point) {
  var self = this
  var marker = new L.marker(point).addTo(self.map).bindPopup('<img src="img/ajax.gif">').openPopup()
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
    for (var i = 0; i < services.stretched.length; i++) {
      if (metadata.County === services.stretched[i].name) {
        var content = '<table class="table table-condensed table-bordered result">'
          + '<tr><td><strong>' + self.identifyType.charAt(0).toUpperCase() + self.identifyType.slice(1) + '</strong></td><td> '
          + '<span class="identify-value"><img src="img/ajax.gif"></span></td></tr>'
          + '<tr><td><strong>Lat, Long</strong></td><td> '
          + latlng.lat.toFixed(3) + ', ' + latlng.lng.toFixed(3) + '</td></tr>'
          + '<tr><td><strong>County</strong></td><td> '
          + metadata["County"] + '</td></tr>'
          + '<tr><td><strong>Date</strong></td><td> '
          + metadata["Date"] + '</td></tr>'
          + '<tr><td><strong>Vertical Accuracy</strong></td><td> '
          + metadata["Vertical Accuracy"] + '</td></tr>'
          + '<tr><td><strong>Vertical Datum</strong></td><td> '
          + metadata["Vertical Datum"] + '</td></tr>'
          + '<tr><td><strong>Project Partners</strong></td><td> '
          + metadata["Project Partners"] + '</td></tr>'
          if (metadata["Planned Acquisitions"]) {
            content += '<tr><td><strong>Planned Acquisitions</strong></td><td> '
              + metadata["Planned Acquisitions"] + '</td></tr>'
          }
        content += '</table>'
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
  this.layertype = service.split('/')[2]
  var layer = {}
  if (this.layertype === 'ImageServer') {
    layer = L.tileLayer.wms(services._base_url + service + "/WMSServer", {
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
      errorTileUrl: 'img/emptytile.png'
    })
  }
  this.lidarGroup.addLayer(layer)
  this.lidarLayer = layer
  this.activeService = service
  if(this.activeService.indexOf('statewide') >= 0) {
    this.statewide = true
  } else {
    this.statewide = false
    this.activeCounty = name
  }
  if(this.activeService.indexOf('slope') >= 0) {
    this.identifyType = 'slope'
    legend.slope()
  } else if(this.activeService.indexOf('aspect') >= 0) {
    this.identifyType = 'aspect'
    legend.aspect()
  } else {
    legend.elevation(service)
    this.identifyType = 'elevation'
  }
  this.lidarGroup.eachLayer(function(l) {
    l.bringToFront()
  })
}

LidarViewer.prototype._identifyValue = function (latlng, next) {
  var self = this
    , service
  if(this.statewide){
    for(var i = 0; i < services.statewide.length; i++){
      if(services.statewide[i].service === this.activeService) {
        service = services.statewide[i].identify
      }
    }
  } else {
    service = this.activeService
  }
  var id_url = services.base_url_rest + service + '/identify'
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