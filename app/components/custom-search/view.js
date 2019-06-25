import Component from '@ember/component';
import behaviours from './behaviours';

export default Component.extend({
  //if isEditable onclick should put it to edit view
  //if isClickable onclick should send an event
  //if isDeletable onclick should delete the component, which will propogate the delete event to its parent and so on
  //composition of components should happen
  init: function () {
    let properties = {
      behaviourFlags: {
        ...this.get('behaviours') || {}
      }
    }
    this.setProperties(properties);
    this.initializeBehaviours(properties.behaviourFlags);
    this._super(...arguments);
  },

  getBehaviour: function (behaviourType) {
    let behaviourFlags = this.get('behaviourFlags');
    return behaviourFlags[behaviourType];
  },

  setBehaviour: function (behaviourType, behaviour) {
    let behaviourFlags = this.get('behaviourFlags');
    behaviourFlags[behaviourType] = behaviour;
  },

  addBehaviour: function (behaviourType) {
    setTimeout(() => {
      let behaviourFlags = this.get('behaviourFlags');
      behaviourFlags[behaviourType] = Object.create(behaviours[behaviourType]);
      let behaviour = behaviourFlags[behaviourType];
      behaviour.afterAdd && (behaviour.init(this) || behaviour.afterAdd(this));
    }, 0);
  },

  removeBehaviour: function (behaviourType) {
    let behaviourFlags = this.get('behaviourFlags');
    let behaviour = behaviourFlags[behaviourType];
    behaviour.beforeRemove && behaviour.beforeRemove(this);
    this.setBehaviour(behaviourType, false);
  },

  initializeBehaviours: function (behaviourFlags, behavioursArray) {
    let hasArray = behavioursArray && Array.isArray(behavioursArray);
    Object.keys(behaviourFlags).forEach(key => {
      if (hasArray && behavioursArray.indexOf(key) == -1) return;
      if (behaviourFlags[key] == "false" || !behaviourFlags[key]) return;

      behaviourFlags[key] = Object.create(behaviours[key]);

      if (typeof behaviourFlags[key] == "function") {
        behaviourFlags[key](runInThisContext);
      }
      if (typeof behaviourFlags[key] == "object") {
        behaviourFlags[key].init && behaviourFlags[key].init(this);
      }
    })
  }

});
