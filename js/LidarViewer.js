function LidarViewer(){
  var self = this;
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  this.services_base_url = 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/';
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


  this.map = new L.Map('map', {
    layers: this.layerGroup
  }).setView(new L.LatLng(38.7, -76.7), 7);

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  mapboxsat.addTo(this.map);

  this.drawnItems = new L.FeatureGroup();
  this.map.addLayer(this.drawnItems);
  var drawControl = new L.Control.Draw({
    draw: {
      polygon: false,
      rectangle: false,
      circle: false,
      marker: false
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
    var latlngs = layer.getLatLngs();
    self.getElevationLine(latlngs);

  });

  this.getElevationLine = function(latlngs){
    var layer = this.layerGroup.getLayer(this.layerID);
    var data = [];
    var count = 0;
    var f = function(latlng, next){
      layer.identify(latlng, {} , function(res){
        data.push({
          distance: count,
          elevation: res.value
        });
        count++;
        next();
      });
    }
    async.each(latlngs, f, function(){
      self.linechart.update(data);
    });
  }

  this.getServices = function(next){
    $.ajax({ 
      type: 'GET',
      url: this.services_base_url + 'ImageServices?f=json' ,
      dataType: 'jsonp', 
      success: function(data) {
        next(data.services);
      }
    });
  }

  this.addServiceLayer = function(service, opacity){
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

  this.identifyElevationTool_click = function(e){
    self.popup.setLatLng(e.latlng)
      .setContent('Loading...')
      .openOn(self.map);
    self._identifyElevation(e.latlng, function(elevation){
      if(elevation === 'NoData') {
        self.popup.setContent('No Data');
      } else {
        self.popup.setContent('Elevation: ' + elevation + ' ft')
      }
    });
  }

  this._identifyElevation = function(latlng, next){
    var layer = self.layerGroup.getLayer(self.layerID);
    layer.identify(latlng, {} , function(res){
      next(res.value);
    });
  }
}
