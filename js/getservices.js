var request = require('request'),
    fs = require('fs'),
    serviceurl = 'http://esrgc2.salisbury.edu/arcgis/rest/services/Elevation?f=pjson';

var new_services = {
  "statewide": [
    "Elevation/Statewide_stretched/MapServer",
    "Elevation/SW_aspect/MapServer"
  ],
  "slope": [],
  "stretched": []
};

request(serviceurl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parseServices(JSON.parse(body));
  }
})

function parseServices(services){
  for(var i = 0; i < services.services.length; i++){
    var service = services.services[i];
    if(service.name.indexOf('slope') > 0){
      if(service.name.indexOf('SW_slope') < 0) {
        new_services.slope.push(service.name + '/' + service.type);
      }
    }
    if(service.name.indexOf('demStretched') > 0){
      new_services.stretched.push(service.name + '/' + service.type);
    }
  }
  fs.writeFile('data/services2.json', JSON.stringify(new_services), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}