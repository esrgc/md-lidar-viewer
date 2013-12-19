/*
 * Author: Frank Rowe, ESRGC
 */

 function GeoCoder() {
  this.url = 'http://mdimap.us/ArcGIS/rest/services/'
    + 'GeocodeServices/MD.State.MDCascadingLocatorWithZIPCodes/GeocodeServer/'
    + 'findAddressCandidates'
}

GeoCoder.prototype.search = function(term, next) {
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