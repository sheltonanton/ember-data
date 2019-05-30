import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    deviceId: DS.attr() //related to device model
});
