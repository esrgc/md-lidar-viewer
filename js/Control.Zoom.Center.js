/*
 * L.Control.Zoom is used for the default zoom buttons on the map.
 */

L.Control.zoomControlCenter = L.Control.Zoom.extend({
  options: {
    position: 'topleft',
    zoomInText: '+',
    zoomInTitle: 'Zoom in',
    zoomOutText: '-',
    zoomOutTitle: 'Zoom out',
    centerText: '<i class="fa fa-globe"></i>',
    centerTitle: 'Max Extent',
    center: [0,0]
  },

  onAdd: function (map) {
    var zoomName = 'leaflet-control-zoom',
        container = L.DomUtil.create('div', zoomName + ' leaflet-bar'),
        options = this.options;

    this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
            zoomName + '-in',  container, this._zoomIn);
    this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
            zoomName + '-out', container, this._zoomOut);

    this._centerButton = this._createButton(options.centerText, options.centerTitle,
            zoomName + '-center', container, this._center);

    this._updateDisabled();
    map.on('zoomend zoomlevelschange', this._updateDisabled, this);

    return container;
  },

  _center: function() {
    this._map.setView(this.options.center, this._map.getMinZoom())
  }
});

L.control.zoomControlCenter = function (options) {
  return new L.Control.zoomControlCenter(options);
}