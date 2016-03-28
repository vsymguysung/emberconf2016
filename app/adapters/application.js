import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
  findAll(store, type) {
    return $.get('/api/' + Ember.String.pluralize(type.modelName)).then((data) => {
      let key = Ember.String.pluralize(type.modelName);
      let normalized = data[key].map((cat) => ({ type: type.modelName, attributes: cat, id:cat.id }));
      return {
        data: normalized
      };
    });
  },

  findRecord(store, type, id, snapshot) {
    return $.get('/api/' + Ember.String.pluralize(type.modelName) + '/' + id).then((data) => {
      let key = Ember.String.pluralize(type.modelName);
      let cat = data[type.modelName];
      let normalized = { type: type.modelName, attributes: cat, id:cat.id };
      return {
        data: normalized
      };
    });
  },

  updateRecord(store, type, snapshot) {
    let key =  type.modelName === 'cat' ? 'cat' : 'dog';
    let objToSend = {};
    objToSend[key] = {
        id: snapshot.id,
        name: snapshot.attr('name')
    };
    return $.ajax({
      method: 'PUT',
      url: '/api/' + Ember.String.pluralize(type.modelName) + '/' + snapshot.id,
      data: JSON.stringify(objToSend)
      }).then(function() { return null; });
  },

  deleteRecord(store, type, snapshot) {
    return $.ajax({
      method: 'DELETE',
      url: '/api/' + Ember.String.pluralize(type.modelName) + '/' + snapshot.id,
    }).then(function() { return null; });
  }
});
