var fs = require('fs')
  , services = require('../js/services')

services.slope.forEach(function(service){
  service.identify = services.statewide[2].identify
})

services.aspect.forEach(function(service){
  service.identify = services.statewide[1].identify
})

services.hillshade.forEach(function(service){
  service.identify = services.statewide[0].identify
})

fs.writeFile('./services.json', JSON.stringify(services, null, 2), function(err){
  console.log('services updated')
})