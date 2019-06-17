import Component from '@ember/component';

export default Component.extend({
    init: function(){
        this._super(...arguments);
        let model = this.get('model');
    },
    actions: {
        saveAll: function(model){
            model.save().then(data => {
                console.log(data.get('children'));
            });
        },
        saveConfiguration: function(configuration){
            configuration.save();
        }
    }
});
