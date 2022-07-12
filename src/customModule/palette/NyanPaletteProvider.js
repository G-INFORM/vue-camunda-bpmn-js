import Cat from '../cat';


/**
 * A provider for quick service task production
 */
export default function NyanPaletteProvider(palette, create, elementFactory) {

  this._create = create;
  this._elementFactory = elementFactory;

  palette.registerProvider(this);
}

NyanPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory'
];

NyanPaletteProvider.prototype.getPaletteEntries = function() {

  var elementFactory = this._elementFactory,
      create = this._create;

  function startCreate(event) {
    var serviceTaskShape = elementFactory.create(
      'shape', { type: 'bpmn:FormalExpression' }
    );

    create.start(event, serviceTaskShape);
  }

  return {
    'create-service-task': {
      group: 'activity',
      title: 'Создать часы',
      imageUrl: Cat.dataURL,
      action: {
        dragstart: startCreate,
        click: startCreate
      }
    }
  };
};