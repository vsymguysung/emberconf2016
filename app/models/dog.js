import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  image: DS.attr(),
  likesCats: DS.attr('boolean'),
  playsFetch: DS.attr('boolean'),
  age: DS.attr()
});
