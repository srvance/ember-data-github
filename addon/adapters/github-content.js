import GithubAdapter from './github';

export default GithubAdapter.extend({
  urlForQueryRecord(query) {
    const repo = query.repo;
    const path = query.path;
    delete query.repo;
    delete query.path;

    return `${this.get('host')}/repos/${repo}/contents${path}`;
  },

  urlForQuery(query) {
    return this.urlForQueryRecord(query);
  }
});
