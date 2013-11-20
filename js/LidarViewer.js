function LidarViewer(){
  var self = this;
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  this.services_base_url = 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/';
  this.services_folder = 'ImageServices';
  this.services_base_url = 'http://esrgc2.salisbury.edu/ArcGIS/rest/services/';
  this.services_folder = 'Elevation';
  this.layerGroup = new L.layerGroup();
  this.identifyElevationTool = false;
  this.popup = new L.popup();

  this.linechart = new GeoDash.LineChart("#line-chart", {
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

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  this.drawnItems = new L.FeatureGroup();
  this.map = new L.Map('map', {
    layers: [mapboxsat, this.layerGroup, this.drawnItems]
  }).setView(new L.LatLng(38.7, -76.7), 7);

  this.getServices();

}

LidarViewer.prototype.getElevationLine = function(latlngs){
  var self = this;
  var layer = this.layerGroup.getLayer(this.layerID);
  var data = [];
  var count = 1;

  var f = function(latlng, next){
    layer.identify(latlng, {} , function(res){
      data.push({
        distance: count,
        elevation: res.value
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

LidarViewer.prototype.addControls = function(services){
  var self = this;
  var options = '<select id="services"><option value="">Services</option>';
  for(var i = 0; i < services.length; i++){
    options += '<option value="'+ services[i].name + '/' + services[i].type + '">' + services[i].name + '</option>';
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

  var drawControl = new L.Control.Draw({
    draw: {
      polygon: true,
      rectangle: false,
      circle: false,
      marker: true,
      polyline: {
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
      self.addControls(data.services);
    }
  });
}

LidarViewer.prototype.addServiceLayer = function(service, opacity){
  this.layerGroup.clearLayers();
  var layer = L.esri.imageServerLayer(this.services_base_url + service, {
    opacity : opacity,
    transparent: true,
    format: 'png24',
    noData: 0
  });
  this.layerGroup.addLayer(layer);
  this.layerID = this.layerGroup.getLayerId(layer);
}

LidarViewer.prototype.identifyElevationTool_click = function(e){
  var self = this;
  this.popup.setLatLng(e.latlng)
    .setContent('Loading...')
    .openOn(self.map);
  this._identifyElevation(e.latlng, function(elevation){
    if(elevation === 'NoData') {
      self.popup.setContent('No Data');
    } else {
      self.popup.setContent('Elevation: ' + elevation + ' ft')
    }
  });
}

LidarViewer.prototype._identifyElevation = function(latlng, next){
  var layer = this.layerGroup.getLayer(this.layerID);
  layer.identify(latlng, {} , function(res){
    next(res.value);
  });
}

