function LidarViewer(){
  var self = this;
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  this.services_base_url = 'http://esrgc2.salisbury.edu/ArcGIS/rest/services/';
  this.services_folder = 'Elevation';
  this.layerGroup = new L.layerGroup();
  this.identifyElevationTool = false;
  this.hasLabels = true;
  this.popup = new L.popup();

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  this.drawnItems = new L.FeatureGroup();

  var world_imagery = L.esri.basemapLayer("Imagery");
  var world_street = L.esri.basemapLayer("Streets");
  var world_topo = L.esri.basemapLayer("Topographic");

  this.labels = L.esri.basemapLayer("ImageryLabels");

  this.statewide_stretched = L.esri.dynamicMapLayer('http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation/Statewide_stretched/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
    noData: 0,
    name: 'Statewide Stretched'
  });
  this.statewide_hillshade = L.esri.dynamicMapLayer('http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation/SW_hillshade/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
    noData: 0,
    name: 'Statewide Hillshade'
  });
  this.statewide_slope = L.esri.dynamicMapLayer('http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation/SW_slope/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
    noData: 0,
    name: 'Statewide Slope'
  });
  this.statewide_aspect = L.esri.dynamicMapLayer('http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation/SW_aspect/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
    noData: 0,
    name: 'Statewide Aspect'
  });
  this.identifyLayer = L.esri.imageServerLayer('http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation/Statewide_dem_m/ImageServer', {
    opacity : 0,
    transparent: true,
    format: 'png24',
    noData: 0
  });
  this.terrainGroup = L.layerGroup([this.statewide_stretched, this.statewide_hillshade, this.statewide_slope, this.statewide_aspect]);

  this.countylayer = L.geoJson(mdcnty);

  var baseMaps = {
      "World Imagery": world_imagery,
      "World Street Map": world_street,
      "World Topo Map": world_topo
  };

  var overlays = {
    "Labels": this.labels,
    'Statewide Stretched': this.statewide_stretched,
    'Statewide Hillshade': this.statewide_hillshade,
    'Statewide Slope': this.statewide_slope,
    'Statewide Aspect': this.statewide_aspect
  };

  this.map = new L.Map('map', {
    layers: [world_imagery, this.identifyLayer, this.statewide_stretched, this.drawnItems]
  }).setView(new L.LatLng(38.8, -77.3), 8);
  
  L.control.layers(baseMaps, overlays, {
    collapsed: false
  }).addTo(this.map); 
  L.control.scale().addTo(this.map);

  $('.leaflet-tile-pane').css("z-index", "auto");

  //change z-index of labels overlay
  this.map.on('overlayadd', function(layer){
    if(layer.name === 'Labels'){
      self.hasLabels = true;
      var el = self.labels.getContainer();
      el.style['z-index'] = 5;
    } else if(layer.name.indexOf('Statewide') >= 0) {
      self.map.removeLayer(self.labels);
      self.drawnItems.bringToFront();
    }
  });
  //change z-index of labels overlay
  this.map.on('overlayremove', function(layer){
    if(layer.name === 'Labels'){
      self.hasLabels = false;
    }
  });
  this.identifyLayer.on('metadata', function(res){
    
  });
  this.terrainGroup.eachLayer(function(layer){
    layer.on('load', function(l){
      if(self.hasLabels){
        self.map.addLayer(self.labels);
      }
    });
  });

  $.get('data/metadata.json', function(res){
    self.metadata = JSON.parse(res);
  });

  this.addControls();

}

LidarViewer.prototype.getElevationLine = function(latlngs){
  var self = this;
  var data = [];
  var count = 1;
  $('.chartControl').css('opacity', 1);
  var f = function(latlng, next){
    self.identifyLayer.identify(latlng, {} , function(res){
      //var value = self.getPixelValue(res);
      var value = res.value;
      data.push({
        distance: count,
        elevation: value
      });
      self.linechart.update(data);
      count++;
      next();
    });
  }
  async.eachSeries(latlngs, f, function(){
    //self.linechart.update(data);
  });
}

LidarViewer.prototype.addControls = function(){
  var self = this;

  // var options = '<select id="services"><option value="">Services</option>';
  // for(var i = 0; i < self.services.length; i++){
  //   options += '<option value="'+ self.services[i].name + '/' + self.services[i].type + '">' + self.services[i].name + '</option>';
  // }
  // options += '</select>';
  // var layerMenu = L.control({position: 'topright'});
  // layerMenu.onAdd = function (map) {
  //     var div = L.DomUtil.create('div', 'layerMenu');
  //     div.innerHTML = options;
  //     div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  //     return div;
  // };
  // layerMenu.addTo(this.map);

  var opacityControl = L.control({position: 'topright'});
  opacityControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'opacityControl');
    self.terrainGroup.eachLayer(function(layer){
      div.innerHTML += '<div class="opacity-layer">'
        + '<div class="terrain-layer">' + layer.options.name + '</div>'
        + '<input type="range" name="points" min="0" max="100" class="opacity-slider" value="'+ layer.options.opacity*100 + '">'
        + '<div class="opacity-value">'+ layer.options.opacity*100 + '%</div>'
        + '</div>';
    });
    div.onmousedown = div.ondblclick = L.DomEvent.stopPropagation;
    return div;
  };
  opacityControl.addTo(this.map);

  var options = '<select id="counties"><option value="">Counties</option>';
  self.countylayer.eachLayer(function(layer){
    options += '<option value="'+ layer.feature.properties.name + '">' + layer.feature.properties.name + '</option>';
  });
  options += '</select>';
  var layerMenu = L.control({position: 'topright'});
  layerMenu.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'layerMenu');
      div.innerHTML = options;
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
  };
  layerMenu.addTo(this.map);

  var legendControl = L.control({position: 'bottomright'});
  legendControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legendControl');
      div.innerHTML = '';
      return div;
  };
  legendControl.addTo(this.map);

  var chartControl = L.control({position: 'bottomleft'});
  chartControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'chartControl');
      div.innerHTML = '<div class="line-chart"></div><button type="button" class="close" aria-hidden="true">&times;</button>';
      var closeButton = $('.close');
      L.DomEvent
        .addListener(div, 'mousedown', function (e) {
          L.DomEvent.stopPropagation(e);
        })
        .addListener(div, 'mousedown', function (e) {
          L.DomEvent.preventDefault(e);
        });
      return div;
  };
  chartControl.addTo(this.map);


  this.linechart = new GeoDash.LineChart(".line-chart", {
    x: 'distance',
    y: 'elevation',
    width: 'auto',
    height: 'auto',
    colors: ["#f00"],
    title: 'Elevation',
    interpolate: 'monotone',
    dotRadius: 3,
    time: false
  });

  L.drawLocal.draw.handlers.marker.tooltip.start = 'Click map to identify.';
  var drawControl = new L.Control.Draw({
    draw: {
      polygon: false,
      rectangle: false,
      circle: false,
      marker: true,
      polyline: {
        zIndexOffset: 9999,
        shapeOptions: {
          color: '#f00',
          weight: 3
        }
      }
    },
    edit: {
      featureGroup: this.drawnItems
    }
  });
  this.map.addControl(drawControl);
  this.map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
    self.drawnItems.addLayer(layer);
    var point = layer.getLatLng();
    if(type === 'marker'){
      var popup = L.popup()
        .setContent('...');
      layer.bindPopup(popup).openPopup();
      var metadata = self.getMetadataFromPoint(point);
      self._identifyElevation(point, function(elevation){
        if(elevation === 'NoData') {
          popup.setContent('No Data');
        } else {
          var vintage = '11/21/2013';
          var accuracy = '0.13';
          var content = '<table class="table table-condensed table-bordered result">'
              + '<tr><td><strong>Elevation</strong></td><td> ' + elevation + ' meters</td></tr>'
              + '<tr><td><strong>County</strong></td><td> ' + metadata["County"] + '</td></tr>'
              + '<tr><td><strong>Date</strong></td><td> ' + metadata["Date"] + '</td></tr>'
              + '<tr><td><strong>Vertical Accuracy</strong></td><td> ' + metadata["Vertical Accuracy"] + '</td></tr>'
              + '<tr><td><strong>Project Partners</strong></td><td> ' + metadata["Project Partners"] + '</td></tr>'
              + '<tr><td><strong>Planned Acquisitions</strong></td><td> ' + metadata["Planned Acquisitions"] + '</td></tr>'
              + '</table>';
          popup.setContent(content);
        }
      });
    } else {
      var esri_geom = Terraformer.ArcGIS.convert(layer.toGeoJSON());
      var latlngs = layer.getLatLngs();
      self.getElevationLine(latlngs);
    }
  });
}

LidarViewer.prototype.getMetadataFromPoint = function(point){
  var results = leafletPip.pointInLayer(point, this.countylayer);
  if(results.length){
    var countyname = results[0].feature.properties.name;
    for(var i = 0; i < this.metadata.length; i++){
      if(this.metadata[i].County === countyname){
        return this.metadata[i];
      }
    }
  } else {
    return false;
  }
  return false;
}

LidarViewer.prototype.getServices = function(next){
  var self = this;
  $.ajax({ 
    type: 'GET',
    url: this.services_base_url + this.services_folder + '?f=json',
    dataType: 'jsonp', 
    success: function(data) {
      self.services = data.services;
      self.addControls();
    }
  });
}

LidarViewer.prototype.addServiceLayer = function(service, opacity){
  this.layerGroup.clearLayers();
  this.layertype = service.split('/')[2];
  var layer;
  if(this.layertype === 'ImageServer'){
    layer = L.esri.imageServerLayer(this.services_base_url + service, {
      opacity : opacity,
      transparent: true,
      format: 'png24',
      noData: 0
    });
  } else if(this.layertype === 'MapServer'){
    layer = L.esri.dynamicMapLayer(this.services_base_url + service, {
      opacity : 1,
      transparent: true,
      format: 'png24',
      noData: 0
    });
  }
  layer.on('metadata', function(res){
    $('.metaDataControl').html(res.metadata.description);
    $('.metaDataControl').show();
  });
  this.layerGroup.addLayer(layer);
  this.layerID = this.layerGroup.getLayerId(layer);
  this.getLegend();
}

LidarViewer.prototype._identifyElevation = function(latlng, next){
  var self = this;
  //var layer = this.layerGroup.getLayer(this.layerID);
  self.identifyLayer.identify(latlng, {} , function(res){
    //var value = self.getPixelValue(res);
    var value = res.value;
    next(value);
  });
}

LidarViewer.prototype.getLegend = function(){
  var layer = this.layerGroup.getLayer(this.layerID);
  L.esri.get(layer.serviceUrl + 'legend/', {}, function(res){
    var legend = '<table>';
    for (var i = 0; i < res.layers[0].legend.length; i++) {
      legend += '<tr>';
      var img = '<img src="data:' + res.layers[0].legend[i].contentType + ';base64, ' + res.layers[0].legend[i].imageData + '" alt="Red dot" />';
      legend += '<td>' + img + '</td><td>'+ res.layers[0].legend[i].label + '</td>';
      legend += '</tr>';
    };
    legend += "</table>";
    $('.legendControl').html(legend);
    $('.legendControl').show();
  }, this);
}

LidarViewer.prototype.getPixelValue = function(res){
  var value;
  if(this.layertype === 'ImageServer'){
    value = res.value;
  } else if(this.layertype === 'MapServer'){
    value = res.results[0].attributes['Pixel Value'];
  }
  return value;
}

