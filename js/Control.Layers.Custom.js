/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 * Custom: Add Control to specific element
 */

L.Control.LayersCustom = L.Control.Layers.extend({
  addTo: function (map, el) {
		this._map = map;
    console.log(el);

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			//corner.insertBefore(container, corner.firstChild);
		} else {
			//corner.appendChild(container);
		}
    el.appendChild(container)

		return this;
	}
});

L.control.layersCustom = function (baseLayers, overlays, options) {
	return new L.Control.LayersCustom(baseLayers, overlays, options);
};
