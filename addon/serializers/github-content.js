import Ember from 'ember';
import GithubSerializer from './github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let normalizedHash = {
      id: resourceHash.sha,
      fileType: resourceHash.type,
      size: resourceHash.size,
      name: resourceHash.name,
      path: resourceHash.path,
      sha: resourceHash.sha,
      url: resourceHash.url,
      gitUrl: resourceHash.git_url,
      htmlUrl: resourceHash.html_url,
      downloadUrl: resourceHash.download_url
    };

    let result = this._super(modelClass, normalizedHash, prop);
    return result;
  }
});
