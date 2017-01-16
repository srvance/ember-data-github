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
  server.get('/repos/user1/repository1/contents/dir/file.js?ref=master', () => {
    return [200, {}, Factory.build('content')];
  });

  return run(() => {
    return store.queryRecord('github-content', {
      path: '/dir/file.js',
      ref: 'master'
    }).then(content => {
      assertGithubContentOk(assert, content);
      assert.equal(store.peekAll('github-content').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    })
  });
});

test('finding the contents of a directory without authorization', function(assert) {
  server.get('/repos/user1/repository1/contents/dir?ref=master', () => {
    return [200, {}, [
      Factory.build('content'),
      Factory.build('content')
    ]];
  });

  return run(() => {
    return store.query('github-content', {
      path: '/dir',
      ref: 'master'
    }).then(content => {
      assertGithubContentOk(assert, content.toArray()[0]);
      assert.equal(store.peekAll('github-content').get('length'), 2);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    })
  });
});
