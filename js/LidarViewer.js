/*
 * Author: Frank Rowe, ESRGC
 */

function LidarViewer() {
  L.esri.get = L.esri.RequestHandlers.JSONP
  this.layer = false
  this.services_base_url = 'http://esrgc2.salisbury.edu/ArcGIS/services/'
  this.services_base_url_rest = 'http://esrgc2.salisbury.edu/ArcGIS/rest/services/'
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
  async.parallel([ 
    function(next) {
      $.getJSON('data/mdcnty.json', function(res) {
        self.mdcnty = res
        next(null)
      })
    }
    , function(next) {
      $.getJSON('data/watershed4.json', function(res) {
        self.watershed = res
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
  ]
  , function(err, res) {
    self.makeMap()
  })
}

LidarViewer.prototype.makeMap = function() {
  var self = this

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png')
    , world_imagery = L.esri.basemapLayer("Imagery")
    , gray = L.esri.basemapLayer("Gray")
    , grayLabels = L.esri.basemapLayer("GrayLabels")
    , esriGray = L.layerGroup([gray, grayLabels])

  var baseMaps = { 
    "Gray": gray
    , "World Imagery": world_imagery
    , "World Imagery with Labels": mapboxsat
  }

  this.labels = L.esri.basemapLayer("ImageryLabels")

  this.countylayer = L.geoJson(this.mdcnty, { style: this.polystyle })
  this.watershedlayer = L.geoJson(this.watershed, { style: this.polystyle })

  this.countyoverlay = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.CountyCompare/{z}/{x}/{y}.png', {
    pane: 'overlayPane',
    errorTileUrl: 'img/emptytile.png'
  })
  this.watershedoverlay = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.watersheds2/{z}/{x}/{y}.png', {
    pane: 'overlayPane',
    errorTileUrl: 'img/emptytile.png'
  })
  var template_current = '<h6>County: {COUNTY}</h6>'+
  '<h6>Date: {DATE}</h6>'+
  '<h6>Partners: {PROJ_PARTN}</h6>'+
  '<h6>Point spacing: {POINT_SPAC}</h6>'+
  '<h6>Vertical Accuracy: {VERT_ACC}</h6>'+
  '<h6>Vertical Datum: {VERT_DATUM}</h6>'

  var template_future = '<h6>County: {COUNTY}</h6>'+
  '<h6>Delivery: {DELIVERY}</h6>' +
  '<h6>Acquistion: {ACQ_DETAIL}</h6>'

  var statuscolors = {
    '2012': '#018571',
    '2011': '#52AA9D',
    '2008': '#A4D0C9',
    '2007': '#F5F5F5',
    '2006': '#DBC4AC',
    '2005': '#C09263',
    '2004': '#A6611A',
    ' ': '#FFD700'
  }

  this.statusoverlay = L.esri.featureLayer("http://services1.arcgis.com/X3lKekbdaBmNjCHu/arcgis/rest/services/LidarStatus/FeatureServer/0", {
    style: function (feature) {
      var color = statuscolors[feature.properties.DATE]
      return { fillColor: color, weight: 1, color: '#333', fillOpacity: 1 };
    },
    onEachFeature: function (feature, layer) {
      if(feature.properties.DELIVERY !== ' ' || feature.properties.ACQ_DETAIL !== ' ') {
        layer.bindPopup(L.Util.template(template_future, feature.properties));
      } else {
        layer.bindPopup(L.Util.template(template_current, feature.properties));
      }
    },
    name: 'Status'
  }).on('add', function(e){
    self.legendtemp = $('.legend').html()
    $('.legend').html('<img src="img/status.png" />')
  }).on('remove', function(e){
    $('.legend').html(self.legendtemp)
  })

  var overlays = {
    "Counties": this.countyoverlay
    , "Watersheds": this.watershedoverlay
    , "Status": this.statusoverlay
  }

  this.map = new L.Map('map', {
    layers: [
      gray
      , this.lidarGroup
      , this.drawnItems
    ]
  })
  self.map.setView([38.8, -77.3], 7)
  
  L.control.layers(baseMaps, overlays, {
    collapsed: true
    , click: true
  }).addTo(this.map)

  L.control.scale().addTo(this.map)

  this.addControls()

  self.activeService = "Elevation/MD_statewide_demStretched_m/ImageServer"
  self.addServiceLayer(self.activeService, 1)
}

LidarViewer.prototype.addControls = function() {
  var self = this
  var options = '<div class="title"><h4>Choose Lidar Layer</h4>'
    + '<div class="toggle"><i class="fa fa-toggle-right"></i></div></div>'
    + '<div class="options">'
    + '<div class="layer-select">'
    + '<div class="layer-name">Statewide</div>'
    + '<select id="statewide" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < self.services.statewide.length; i++) {
    options += '<option value="'
      + self.services.statewide[i].service+ '">'
      + self.services.statewide[i].name+ '</option>'
  }
  options += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Stretched</div>'
    + '<select id="county-stretched" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < self.services.stretched.length; i++) {
    options += '<option value="'
      + self.services.stretched[i].service + '">'
      + self.services.stretched[i].name + '</option>'
  }
  options += '</select></div>'
    + '<div class="layer-select">'
    + '<div class="layer-name">County Slope</div>'
    + '<select id="county-slope" class="services">'
    + '<option value="">---</option>'
  for (var i = 0; i < self.services.slope.length; i++) {
    options += '<option value="'
      + self.services.slope[i].service + '">'
      + self.services.slope[i].name + '</option>'
  }
  options += '</select></div>'
    + '<div class="layer-name">Opacity</div>'
    + '<input type="range" name="points" min="0" max="100"'
    + ' class="opacity-slider" value="100">'

  var addressform = '<div class="addressControl"><div class="row">'
    + '<div class="col-lg-12">'
    + '<div class="input-group">'
    + '<input type="text" class="form-control" '
    + 'id="geocode-input" placeholder="Address Search">'
    + '<span class="input-group-btn">'
    + '<button type="submit" class="geocode btn btn-default" type="button">Search</button>'
    + '</span>'
    + '</div></div></div>'
    + '<div class="row"><div class="col-lg-12">'
    + '<div class="geocode-error"></div>'
    + '</div></div></div>'

  options += addressform

  options += '<div class="identifyControl">'
  + '<button type="submit" class="identify btn btn-default" type="button" data-toggle="button">Identify</button>'
  + '</div>'

  options += '</div>'

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

      div.innerHTML += '<p class="legendDesc">Elevation (m)</p>'
        + '<img src="img/legend.jpg" alt="legend" class="legendImg" height="180px" width="30px">'
        + '<div class="legendLabel">'
        + '<p id="legendMax"></p>'
        + '<p id="legendMid"></p>'
        + '<p id="legendMin"></p>'

      self.updateLegend("Elevation/MD_statewide_demStretched_m/ImageServer")

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

  this.linechart = new GeoDash.LineChart(".line-chart", {
    x: 'distance'
    , y: 'elevation'
    , width: 'auto'
    , height: 'auto'
    , colors: ["#f00"]
    , title: 'Elevation'
    , interpolate: 'monotone'
    , dotRadius: 3
    , time: false
  })
}

LidarViewer.prototype.identifyContent = function (point, next) {
  var self = this
  this._identifyElevation(point, function(elevation, metadata) {
    if (elevation === 'NoData') {
      next('No Data')
    } else {
      var content = '<table class="table table-condensed table-bordered result">'
        + '<tr><td><strong>Elevation (m)</strong></td><td> '
        + elevation + ' meters</td></tr>'
        + '<tr><td><strong>Elevation (ft)</strong></td><td> '
        + parseFloat(elevation) * 3.28084 + ' feet</td></tr>'
        + '<tr><td><strong>Location</strong></td><td> '
        + point.lng.toFixed(5) + ', ' + point.lat.toFixed(5) + '</td></tr>'
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
  })
}

LidarViewer.prototype.getMetadataFromPoint = function (point) {
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
  var layer
  if (this.layertype === 'ImageServer') {
    layer = L.tileLayer.wms(this.services_base_url + service + "/WMSServer", {
      layers: service.split('/')[1]
      , format: 'image/png'
      , transparent: true
      , attribution: "ESRGC"
      , opacity : opacity
    })
  } else if (this.layertype === 'MapServer') {
    layer = L.esri.dynamicMapLayer(this.services_base_url_rest + service, {
      opacity : 1
      , transparent: true
      , format: 'png24'
      , noData: 0
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

  if(service.length == 0 || service == "Elevation/MD_statewide_demStretched_m/ImageServer"){
    max = 1024
    min = -51
    update(min, max)
  } else {
    if(service.search("Stretched") >= 0){
      $('.legend').css("visibility", "visible")

      url = 'http://esrgc2.salisbury.edu/arcgis/rest/services/'
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

LidarViewer.prototype.getElevationLine = function (latlngs) {
  var self = this
    , data = []
    , count = 1

  $('.chartControl').show()
  var f = function (latlng, next) {
    self._identifyElevation(latlng, function(value, metadata) {
      data.push({
        distance: count
        , elevation: value
      })
      self.linechart.update(data)
      count++;
      next()
    })
  }
  async.eachSeries(latlngs, f, function() {
    //self.linechart.update(data)
  })
}

LidarViewer.prototype._identifyElevation = function (latlng, next) {
  var self = this
  var metadata = self.getMetadataFromPoint(latlng)
  for (var i = 0; i < self.services.stretched.length; i++) {
    if (metadata.County === self.services.stretched[i].name) {
      var url = self.services.stretched[i].service
      if (self.identifyLayer) { 
        self.map.removeLayer(self.identifyLayer)
      }
      self.identifyLayer = L.esri.imageServerLayer(self.services_base_url_rest + url, {
        opacity : 0
        , transparent: true
        , format: 'png24'
        , noData: 0
      })
      self.map.addLayer(self.identifyLayer)
    }
  }
  self.identifyLayer.identify(latlng, {} , function(res) {
    var value = res.value
    next(value, metadata)
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
      var marker = L.marker(point)
      self.drawnItems.addLayer(marker)
      var popup = L.popup()
        .setContent('<i class="fa fa-refresh fa-spin"></i>')
      marker.bindPopup(popup).openPopup()
      self.identifyContent(point, function(content) {
        popup.setContent(content)
      })
    } else {
      $('.geocode-error').html('<p>Address Not Found</p>')
    }
  })
}

LidarViewer.prototype.identify = function() {
  var self=this
  self.marker

  //'.active' is toggled in main.js right before this function is called
  if($('.identify').hasClass('active')){
    self.map.on('click', function (e){
      if(typeof self.marker != "undefined"){
        self.drawnItems.removeLayer(self.marker)
      }
      self.marker = new L.marker(e.latlng)
      self.drawnItems.addLayer(self.marker)
      var popup = L.popup().setContent('<i class="fa fa-refresh fa-spin"></i>')
      self.marker.bindPopup(popup).openPopup()
      self.identifyContent(e.latlng, function(content) {
        popup.setContent(content)
      })
    });
  }
  else{
    //clears the map of markers and kills the click event in the if statement once the identify button isn't marked as active
    if(typeof self.marker != "undefined"){
      self.drawnItems.removeLayer(self.marker)
    }
    self.map.off('click')
  }
}