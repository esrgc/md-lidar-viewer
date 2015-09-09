/*
 * Author: Frank Rowe, ESRGC
 */

function GeoCoder() {
  this.url = 'http://geodata.md.gov'
    + '/imap/rest/services/GeocodeServices/MD_CompositeLocatorWithZIPCodeCentroids/GeocodeServer/findAddressCandidates'
}

GeoCoder.prototype.search = function(term, next) {
  console.log(term);
  var query = {
    SingleLine: term
    , outSR: 4326
    , f: 'pjson'
  }
  $.ajax({
    type : "GET"
    , dataType : "jsonp"
    , data: query
    , url : this.url
    , success: function(res) {
      console.log(res);
      if (res.candidates.length) {
        var latlng = [
          res.candidates[0].location.y
          , res.candidates[0].location.x
        ]
        next(latlng)
      } else {
        next(false)
      }
    }
  })
}

module.exports = new GeoCoder()
