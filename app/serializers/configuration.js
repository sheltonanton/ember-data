import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
      payload = {
        configurations: payload
      }
      return this._super(store, primaryModelClass, payload, id, requestType);
    }
});
