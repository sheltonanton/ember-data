import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    findRecord: function(store, type, ids, snapshots){
        return this._super(store, type, ids, snapshots);
    },
    findHasMany: function(store, snapshot, url, relationship){
        return this._super(store, snapshot, url, relationship);
    }
});
