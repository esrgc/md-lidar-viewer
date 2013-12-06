function LidarViewer(){
  var self = this;
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  //this.services_base_url = 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/';
  //this.services_folder = 'ImageServices';
  this.services_base_url = 'http://esrgc2.salisbury.edu/ArcGIS/rest/services/';
  this.services_folder = 'Elevation';
  this.layerGroup = new L.layerGroup();
  this.identifyElevationTool = false;
  this.popup = new L.popup();

  // this.linechart = new GeoDash.LineChart("#line-chart", {
  //   x: 'distance',
  //   y: 'elevation',
  //   width: 'auto',
  //   height: 'auto',
  //   colors: ["#f00"],
  //   title: 'Elevation',
  //   interpolate: 'monotone',
  //   dotRadius: 3,
  //   time: false
  // });

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  this.drawnItems = new L.FeatureGroup();

  var world_imagery = L.esri.dynamicMapLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
  });
  var world_street = L.esri.dynamicMapLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
  });
  var world_topo = L.esri.dynamicMapLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer', {
    opacity : 1,
    transparent: true,
    format: 'png24',
  });

  var baseMaps = {
      "World Imagery": world_imagery,
      "World Street Map": world_street,
      "World Topo Map": world_topo
  };

  this.map = new L.Map('map', {
    layers: [world_imagery, this.layerGroup, this.drawnItems],
    attributionControl: false
  }).setView(new L.LatLng(38.7, -76.7), 7);
  
  L.control.layers(baseMaps).addTo(this.map);

  this.getServices();

}

LidarViewer.prototype.getElevationLine = function(latlngs){
  var self = this;
  var layer = this.layerGroup.getLayer(this.layerID);
  var data = [];
  var count = 1;

  var f = function(latlng, next){
    layer.identify(latlng, {} , function(res){
      var value = self.getPixelValue(res);
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
  var options = '<select id="services"><option value="">Services</option>';
  for(var i = 0; i < self.services.length; i++){
    options += '<option value="'+ self.services[i].name + '/' + self.services[i].type + '">' + self.services[i].name + '</option>';
  }
  options += '</select>';
  var layerMenu = L.control({position: 'topright'});
  layerMenu.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'layerMenu');
      div.innerHTML = options;
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
  };
  layerMenu.addTo(this.map);

  var opacityControl = L.control({position: 'topright'});
  opacityControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'opacityControl');
      div.innerHTML = '<input type="range" name="points" min="1" max="100" id="opacitySlider" value="100">';
      div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
      return div;
  };
  opacityControl.addTo(this.map);

  var legendControl = L.control({position: 'bottomright'});
  legendControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legendControl');
      div.innerHTML = '';
      return div;
  };
  legendControl.addTo(this.map);

  var metaDataControl = L.control({position: 'bottomleft'});
  metaDataControl.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'metaDataControl');
      div.innerHTML = '';
      return div;
  };
  metaDataControl.addTo(this.map);

  L.drawLocal.draw.handlers.marker.tooltip.start = 'Click map to identify.';
  var drawControl = new L.Control.Draw({
    draw: {
      polygon: true,
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
    if(type === 'marker'){
      var popup = L.popup()
        .setContent('...');
      layer.bindPopup(popup).openPopup();
      self._identifyElevation(layer.getLatLng(), function(elevation){
        if(elevation === 'NoData') {
          popup.setContent('No Data');
        } else {
          popup.setContent('Elevation: ' + elevation + ' ft');
        }
      });
    } else {
      var esri_geom = Terraformer.ArcGIS.convert(layer.toGeoJSON());
      var latlngs = layer.getLatLngs();
      self.getElevationLine(latlngs);
    }
  });
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
    console.log(JSON.stringify(res.metadata));
    console.log(res);
    $('.metaDataControl').html(res.metadata.description);
    $('.metaDataControl').show();
  });
  this.layerGroup.addLayer(layer);
  this.layerID = this.layerGroup.getLayerId(layer);
  this.getLegend();
}

LidarViewer.prototype._identifyElevation = function(latlng, next){
  var self = this;
  var layer = this.layerGroup.getLayer(this.layerID);
  layer.identify(latlng, {} , function(res){
    var value = self.getPixelValue(res);
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

