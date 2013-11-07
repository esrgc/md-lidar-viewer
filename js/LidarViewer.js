function LidarViewer(){
  L.esri.get = L.esri.RequestHandlers.JSONP;
  this.layer = false;
  this.base_url = 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/';
  this.layerGroup = new L.layerGroup();

  this.getServices = function(next){
    $.ajax({ 
      type: 'GET',
      url: 'http://esrgc1.salisbury.edu/ArcGIS/rest/services/ImageServices?f=json' ,
      dataType: 'jsonp', 
      success: function(data) {
        next(data.services);
      }
    });
  }
}
