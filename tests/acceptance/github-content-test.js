import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | github content', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
    app = startApp();
    container = app.__container__;
    store = run(container, 'lookup', 'service:store');
  },

  afterEach() {
    server.shutdown();
    run(app, app.destroy);
    Ember.BOOTED = false;
  }
});

test('finding content that is a simple file without authorization', function(assert) {
  server.get('/repos/user1/repository1/contents/dir/file.js', () => {
    return [200, {}, Factory.build('content')];
  });

  return run(() => {
    return store.findRecord('github-content', '/dir/file.js').then(content => {
      assertGithubContentOk(assert, content);
      assert.equal(store.peekAll('github-content').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    })
  });
});
