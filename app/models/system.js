import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    relationName: DS.attr(),
    users: DS.hasMany('user'),
    configurations: DS.hasMany('configuration')
});
