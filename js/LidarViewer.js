function LidarViewer(){
  var self = this;
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  this.services_base_url = 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/';
  this.layerGroup = new L.layerGroup();
  this.identifyElevationTool = false;
  this.popup = new L.popup();

  this.map = new L.Map('map', {
    layers: this.layerGroup
  }).setView(new L.LatLng(38.7, -76.7), 7);

  var mapboxsat = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');
  mapboxsat.addTo(this.map);


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

  this.identifyElevation = function(e){
    self.popup.setLatLng(e.latlng)
      .setContent('Loading...')
      .openOn(self.map);
    var layer = self.layerGroup.getLayer(self.layerID);
    layer.identify(e.latlng, {} , function(res){
      if(res.value === 'NoData') {
        self.popup.setContent('No Data');
      } else {
        self.popup.setContent('Elevation: ' + res.value + ' ft')
      }
    });
  }
}
