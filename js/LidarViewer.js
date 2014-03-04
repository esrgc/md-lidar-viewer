/*
 * Author: Frank Rowe, ESRGC
 */

function LidarViewer() {
  this.layer = false
  this.services_base_url = 'http://lidar.salisbury.edu/ArcGIS/services/'
  this.services_base_url_rest = 'http://lidar.salisbury.edu/ArcGIS/rest/services/'
  this.services_folder = 'Elevation'
  this.identifyElevationTool = false
  this.hasLabels = true
  this.popup = new L.popup()
  this.geocoder = new GeoCoder()
  this.lidarLayer = false
  this.lidarGroup = new L.layerGroup()
  this.drawnItems = new L.FeatureGroup()
  this.polystyle = {
    color: '#333'
    , fillOpacity: 0
    , weight: 2
  }
  this.load()
}

LidarViewer.prototype.load = function() {
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
      $.getJSON('data/services.json', function(res) {
        self.services = res
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
    $('.legend .lidar-legend').hide()
    $('.legend .status-legend').show().html('<img src="img/status.png" />')
  }).on('remove', function(e){
    if(!self.map.hasLayer(self.futurestatus)){
      $('.legend .status-legend').hide()
      $('.legend .lidar-legend').show()
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
    $('.legend .lidar-legend').hide()
    $('.legend .status-legend').show().html('<img src="img/status.png" />')
  }).on('remove', function(e){
    if(!self.map.hasLayer(self.currentstatus)){
      $('.legend .status-legend').hide()
      $('.legend .lidar-legend').show()
    }
  })

  this.overlays = {
    "Future Acquisitions": this.futurestatus
    , "Most Recent Acquisitions": this.currentstatus
    , "Counties": this.countyoverlay
    , "Watersheds": this.watershedoverlay
  }

  this.map = new L.Map('map', {
    layers: [
      gray
      , this.lidarGroup
      , this.drawnItems
    ]
  })
  var hash = new L.Hash(this.map)
  this.map.setView([38.8, -77.3], 8)
  this.map.on('click', function(e) {
    self.identify(e.latlng)
  })

  L.control.scale().addTo(this.map)

  this.addControls()
  $('.layerMenu').css('max-height', $(window).height()-20)

  L.control.layersCustom(this.baseMaps, this.overlays, {
    collapsed: false
    , click: false
  }).addTo(this.map, $('.custom-layer-menu .section-content')[0])

  self.activeService = self.services.statewide[0].service
  self.addServiceLayer(self.activeService, 1)
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
  for (var i = 0; i < self.services.statewide.length; i++) {
    lidar_menu_section += '<option value="'
      + self.services.statewide[i].service+ '">'
      + self.services.statewide[i].name+ '</option>'
  }
  lidar_menu_section += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Shaded Relief</div>'
    + '<select id="county-stretched" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < self.services.stretched.length; i++) {
    lidar_menu_section += '<option value="'
      + self.services.stretched[i].service + '">'
      + self.services.stretched[i].name + '</option>'
  }
  lidar_menu_section += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Slope</div>'
    + '<select id="county-slope" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < self.services.slope.length; i++) {
    lidar_menu_section += '<option value="'
      + self.services.slope[i].service + '">'
      + self.services.slope[i].name + '</option>'
  }
  lidar_menu_section += '</select></div></div>'

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
    + '<div class="layer-name">Address Search</div><div class="row">'
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
    + '<li>Click anywhere on the map to identify elevation.</li>'
    + '<li>Elevation units represent bare earth values.</li>'
    + '<li><a href="http://lidar.salisbury.edu/ArcGIS/rest/services/" target="_blank">Services Directory</a></li>'
    + '</ul></div>'

  options += instructions_menu_section

  var layerMenu = L.control({position: 'topright'})
  layerMenu.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'layerMenu')
      div.className = div.className + " leaflet-control-layers"
      div.innerHTML = options
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation
      L.DomEvent.disableClickPropagation(div)
      return div
  }
  layerMenu.addTo(this.map)
  $($('#statewide option').get(1)).prop('selected', true)
  $('.identify').button()

  var legend = L.control({position: 'bottomleft'});

  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend')

      div.innerHTML += '<div class="status-legend"></div><div class="lidar-legend"><p class="legendDesc">Elevation (m)</p>'
        + '<img src="img/legend.jpg" alt="legend" class="legendImg" height="180px" width="30px">'
        + '<div class="legendLabel">'
        + '<p id="legendMax"></p>'
        + '<p id="legendMid"></p>'
        + '<p id="legendMin"></p></div>'

      self.updateLegend(self.services.statewide[0].service)

      return div;
  };

  legend.addTo(this.map);

  var chartControl = L.control({position: 'bottomleft'})
  chartControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'chartControl')
      div.innerHTML = '<div class="line-chart"></div>'
        + '<button type="button" class="close" aria-hidden="true">&times;'
        + '</button>'
      var closeButton = $('.close')
      L.DomEvent
        .addListener(div, 'mousedown', function (e) {
          L.DomEvent.stopPropagation(e)
        })
        .addListener(div, 'mousedown', function (e) {
          L.DomEvent.preventDefault(e)
        })
      return div
  }
  chartControl.addTo(this.map)
}

LidarViewer.prototype.identify = function(point) {
  var self = this
  var marker = new L.marker(point).addTo(self.map).bindPopup('<i class="fa fa-refresh fa-spin"></i>').openPopup()
  self.identifyContent(point, function(content, service) {
    marker.getPopup().setContent(content)
    if(service) {
      self._identifyElevation(point, service, function(elevation, err){
        var elevation_display = ''
        if(err) {
          elevation_display = 'Error loading elevation data'
        } else {
          if(!parseFloat(elevation)) {
            elevation_display = elevation
          } else {
            var m = Math.round(parseFloat(elevation) * 100) / 100
              , ft =  Math.round((m * 3.28084) * 100) / 100
            m += ' m'
            ft += ' ft'
            elevation_display = m + '<br>' + ft
          }
        }
        var content = $(marker.getPopup().getContent())
        var popupContent = $('<div/>').html(content).contents()
        $(popupContent.find('.elevationm')[0]).html(elevation_display)
        marker.getPopup().setContent(popupContent[0].outerHTML)
      })
    }
  })
}

LidarViewer.prototype.identifyContent = function (latlng, next) {
  var self = this
  var metadata = self.getMetadataFromPoint(latlng)
  if(metadata) {
    for (var i = 0; i < self.services.stretched.length; i++) {
      if (metadata.County === self.services.stretched[i].name) {
        var service = self.services.stretched[i].service
        var content = '<table class="table table-condensed table-bordered result">'
          + '<tr><td><strong>Elevation</strong></td><td> '
          + '<span class="elevationm"><img src="img/ajax.gif"></span></td></tr>'
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
        next(content, service)
      }
    }
  } else {
    next('No Data', false)
  }
}

LidarViewer.prototype.getMetadataFromPoint = function (point) {
  var inMaryland = leafletPip.pointInLayer(point, this.mdbuffer)
  if(inMaryland.length) {
    var results = leafletPip.pointInLayer(point, this.countylayer)
    if (results.length) {
      var countyname = results[0].feature.properties.name
      for (var i = 0; i < this.metadata.length; i++) {
        if (this.metadata[i].County === countyname) {
          return this.metadata[i]
        }
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

LidarViewer.prototype.getServices = function (next) {
  var self = this
  $.getJSON('data/services.json', function(res) {
    self.services = res
    self.addControls()
  })
}

LidarViewer.prototype.addServiceLayer = function (service, opacity) {
  this.lidarGroup.clearLayers()
  this.layertype = service.split('/')[2]
  var layer = {}
  if (this.layertype === 'ImageServer') {
    layer = L.tileLayer.wms(this.services_base_url + service + "/WMSServer", {
      layers: service.split('/')[1]
      , format: 'image/png'
      , transparent: true
      , attribution: "ESRGC"
      , opacity : opacity
      , pane: 'overlayPane'
    })
  } else if (this.layertype === 'MapServer') {
    layer = L.tileLayer(this.services_base_url_rest + service + '/tile/{z}/{y}/{x}/', {
      pane: 'overlayPane',
      errorTileUrl: 'img/emptytile.png'
    })
  }
  this.updateLegend(service)
  this.lidarGroup.addLayer(layer)
  this.lidarLayer = layer
  this.activeService = service
  this.lidarGroup.eachLayer(function(l) {
    l.bringToFront()
  })
}

LidarViewer.prototype.updateLegend = function (service) {
  var self = this
  var max, min, mid

  var update = function(min, max) {
    mid = (min+max)/2.0

    min = min.toFixed(2)
    max = max.toFixed(2)
    mid = mid.toFixed(2)

    $("#legendMin").html(min)
    $("#legendMid").html(mid)
    $("#legendMax").html(max)
  }
  if(service.length == 0 || service == self.services.statewide[0].service){
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

LidarViewer.prototype._identifyElevation = function (latlng, service, next) {
  var self = this
  var id_url = self.services_base_url_rest + service + '/identify'
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
  self.geocoder.search(term, function(res) {
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
