import Component from '@ember/component';
import {Promise} from 'rsvp';

export default Component.extend({
    init: function(){
        this._super(...arguments);
    },
    actions: {
        saveAll: function(model){
            //task:2
            //saving the model along with embedded related records
            //use DS.EmbeddedRecordMixin and set attrs: {name: {serialize: 'records'}}

            //saving the model along with related reference ids
            //use DS.EmbeddedRecordMixin and set attrs: {name: {serialize: 'ids'}}
            let configurations = model.get('configurations');
            Promise.all(configurations.invoke('save')).then(()=>{
                configurations.invoke('set', 'edit', false);
                model.save();
            });
        },
        addConfiguration: function(configurations){
            //creating a new record and assigning pushing it to array
            let record = configurations.createRecord({
                name: '',
                configData: '',
                edit: true
            })
            system.get('configurations').pushObject(record);
        },
        removeConfiguration: function(system, configuration){
            //removing the current record from system relationship
            //task:6
            system.get('configurations').removeObject(configuration);
            configuration.deleteRecord(); //delete but not save
            configuration.destroyRecord(); //delete and save it
        },
        editConfiguration: function(configuration){
            //enable the edit flag in configuration
            configuration.set('edit', true);
        },
        saveConfiguration: function(configuration){
            //save the configuration to server
            configuration.set('edit', false);
            configuration.save();
        },
        cancelConfiguration: function(configuration){
            //cancel the edit display
            configuration.set('edit', false);
            configuration.rollbackAttributes();
        }
    }
});
