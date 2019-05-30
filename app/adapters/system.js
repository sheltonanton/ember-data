import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findRecord: function (store, type, ids, snapshots) {
    return this._super(store, type, ids, snapshots);
  },
  findHasMany: function (store, snapshot, url, relationship) {
    let adapterOptions = snapshot.adapterOptions;
    if(adapterOptions){
        adapterOptions = Object.keys(adapterOptions).reduce((a, c)=>{
            return a + c + '=' + adapterOptions[c] + '&';
        }, '')
    }else{
        adapterOptions = '';
    }
    url = url + "?" + adapterOptions;
    let returnValue  = this._super(store, snapshot, url, relationship);
    return returnValue;
  }
});
