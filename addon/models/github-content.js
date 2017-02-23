import DS from 'ember-data';

export default DS.Model.extend({
  fileType: DS.attr('string'),
  size: DS.attr('number'),
  name: DS.attr('string'),
  path: DS.attr('string'),
  sha: DS.attr('string'),
  url: DS.attr('string'),
  gitUrl: DS.attr('string'),
  htmlUrl: DS.attr('string'),
  downloadUrl: DS.attr('string')
});
