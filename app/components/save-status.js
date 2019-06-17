import Component from '@ember/component';
import {computed} from '@ember/object';

export default Component.extend({
    init: function(){
        this._super(...arguments);
        this.set('isNew', true);
    },
    status: computed('model.hasDirtyAttributes', 'model.isSaving', 'isNew', function () {
        let hasDirtyAttributes = this.get('model.hasDirtyAttributes');
        let isSaving = this.get('model.isSaving');
        //value as itself
        if (!hasDirtyAttributes && !isSaving && this.get('isNew')) {
            return [{...this.constants.none}]
        }
        //value changed
        if(hasDirtyAttributes && !isSaving){
            return [{...this.constants.edited}]
        }
        //value saving
        if(isSaving){
            this.set('isNew', false);
            return [{...this.constants.saving}]
        }
        //value saved
        if(!hasDirtyAttributes && !isSaving){
            setTimeout(()=>{
                this.set('isNew', true);
            },1000);
            return [{...this.constants.saved}]
        }
    }),
    constants: {
      none: {
        class: 'new',
        value: 'no change',
        image: ''
      },
      edited: {
        class: 'edited',
        value: 'value changed',
        image: ''
      },
      saving: {
        class: 'saving',
        value: 'saving',
        image: ''
      },
      saved: {
        class: 'saved',
        value: 'saved',
        image: ''
      }
    }
});
