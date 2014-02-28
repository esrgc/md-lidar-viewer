/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 * Custom: Add Control to specific element
 */

L.Control.LayersCustom = L.Control.Layers.extend({
  addTo: function (map, el) {
		this._map = map;

		var container = this._container = this.onAdd(map);

		L.DomUtil.addClass(container, 'leaflet-control');

    el.appendChild(container)

		return this;
	}
});

L.control.layersCustom = function (baseLayers, overlays, options) {
	return new L.Control.LayersCustom(baseLayers, overlays, options);
};
