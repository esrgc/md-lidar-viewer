/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 * Custom: Add Control to specific element, order layers according to index
 */

L.Control.LayersCustom = L.Control.Layers.extend({
  addTo: function (map, el) {
		this._map = map;

		var container = this._container = this.onAdd(map);

		L.DomUtil.addClass(container, 'leaflet-control');

    el.appendChild(container)

		return this;
	},

  initialize: function (baseLayers, overlays, options) {
    L.setOptions(this, options);

    this._layers = {};
    this._lastZIndex = 0;
    this._handlingClick = false;

    var idx = 0
    for (var i in baseLayers) {
      this._addLayer(baseLayers[i], i, false, idx);
      idx++;
    }

    idx = 0
    for (var i in overlays) {
      this._addLayer(overlays[i], i, true, idx);
      idx ++;
    }
  },

  _addLayer: function (layer, name, overlay, idx) {
    layer.on('add remove', this._onLayerChange, this);

    var id = L.stamp(layer);

    this._layers[id] = {
      layer: layer,
      name: name,
      overlay: overlay,
      index: idx || 0
    };

    if (this.options.autoZIndex && layer.setZIndex) {
      this._lastZIndex++;
      layer.setZIndex(this._lastZIndex);
    }
  },

  _update: function () {
    if (!this._container) { return; }

    this._baseLayersList.innerHTML = '';
    this._overlaysList.innerHTML = '';

    var baseLayersPresent, overlaysPresent, i, obj;

    var layerArray = [];
    for (i in this._layers){
      layerArray.push(this._layers[i])
    }
    layerArray.sort(function(a, b){
      return a.index - b.index
    })
    console.log(layerArray);
    for(i = 0; i < layerArray.length; i++) {
      obj = layerArray[i];
      this._addItem(obj);
      overlaysPresent = overlaysPresent || obj.overlay;
      baseLayersPresent = baseLayersPresent || !obj.overlay;
    }

    this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

    return this;
  }
});

L.control.layersCustom = function (baseLayers, overlays, options) {
	return new L.Control.LayersCustom(baseLayers, overlays, options);
};
