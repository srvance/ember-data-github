import Ember from 'ember';

export default Ember.Test.registerHelper(
  'assertGithubContentOk',
  function (app, assert, content) {
    assert.ok(content.get('fileType'));
    assert.ok(content.get('size'));
    assert.ok(content.get('name'));
    assert.ok(content.get('path'));
    assert.ok(content.get('sha'));
    assert.ok(content.get('url'));
    assert.ok(content.get('gitUrl'));
    assert.ok(content.get('htmlUrl'));
    assert.ok(content.get('downloadUrl'));
  }
);
