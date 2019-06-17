import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    configurations: {
      deserialize: 'ids',
      serialize: 'ids'
    }
  },
  normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
    payload = {
      systems: payload
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
