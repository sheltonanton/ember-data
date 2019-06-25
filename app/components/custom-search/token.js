import Component from '@ember/component';

export default Component.extend({
    tagName: 'div',
    classNames: 'custom-search--token',
    init: function(){
        this._super(...arguments);
    }
});
