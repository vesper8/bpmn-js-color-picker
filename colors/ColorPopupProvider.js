const COLORS = [ {
  label: 'Default',
  fill: undefined,
  stroke: undefined
}, {
  label: 'Blue',
  fill: '#BBDEFB',
  stroke: '#0D4372'
}, {
  label: 'Orange',
  fill: '#FFE0B2',
  stroke: '#6B3C00'
}, {
  label: 'Green',
  fill: '#C8E6C9',
  stroke: '#205022'
}, {
  label: 'Red',
  fill: '#FFCDD2',
  stroke: '#831311'
}, {
  label: 'Purple',
  fill: '#E1BEE7',
  stroke: '#5B176D'
} ];


export default function ColorPopupProvider(config, popupMenu, modeling, translate) {
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._translate = translate;

  this._colors = config && config.colors || COLORS;

  this._popupMenu.registerProvider('color-picker', this);
}


ColorPopupProvider.$inject = [
  'config.colorPicker',
  'popupMenu',
  'modeling',
  'translate'
];


ColorPopupProvider.prototype.getEntries = function(elements) {
  var self = this;

  var entries = this._colors.map(function(color) {

    return {
      title: self._translate(color.label),
      id: color.label.toLowerCase() + '-color',
      className: 'color-icon-' + color.label.toLowerCase(),
      action: createAction(self._modeling, elements, color)
    };
  });

  return entries;
};


function createAction(modeling, element, color) {
  return function() {
    modeling.setColor(element, color);
  };
}