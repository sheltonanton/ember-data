import Component from '@ember/component';

export default Component.extend({
    init: function(){
        this._super(...arguments);
        let model = this.get('model');
        let users = model.get('users');
        let configuratios = model.get('configurations');
    }
});
