export default {
  defineContent() {
    Factory.define('content')
      .attr('type', 'file')
      .attr('size', 17)
      .attr('name', 'file.js')
      .attr('path', ['name'], function(name) {
        return `dir/${name}`;
      })
      .sequence('sha')
      .attr('url', ['path'], function(path) {
        return `https://api.github.com/repos/user1/repository1/contents/${path}`;
      })
      .attr('git_url', ['sha'], function(sha) {
        return `https://api.github.com/repos/user1/repository1/git/blobs/${sha}`;
      })
      .attr('html_url', ['path'], function(path) {
        return `https://api.github.com/user1/repository1/blob/master/${path}`;
      })
      .attr('download_url', ['path'], function(path) {
        return `https://raw.githubusercontent.com/user1/repository1/master/${path}`;
      })
      .attr('_links', ['url', 'git_url', 'html_url'], function(url, git_url, html_url) {
        return {
          self: url,
          git: git_url,
          html: html_url
        };
      });
  }
};

/*
[
  {
    "type": "file",
    "size": 625,
    "name": "octokit.rb",
    "path": "lib/octokit.rb",
    "sha": "fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
    "url": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit.rb",
    "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
    "html_url": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb",
    "download_url": "https://raw.githubusercontent.com/octokit/octokit.rb/master/lib/octokit.rb",
    "_links": {
      "self": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit.rb",
      "git": "https://api.github.com/repos/octokit/octokit.rb/git/blobs/fff6fe3a23bf1c8ea0692b4a883af99bee26fd3b",
      "html": "https://github.com/octokit/octokit.rb/blob/master/lib/octokit.rb"
    }
  },
  {
    "type": "dir",
    "size": 0,
    "name": "octokit",
    "path": "lib/octokit",
    "sha": "a84d88e7554fc1fa21bcbc4efae3c782a70d2b9d",
    "url": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit",
    "git_url": "https://api.github.com/repos/octokit/octokit.rb/git/trees/a84d88e7554fc1fa21bcbc4efae3c782a70d2b9d",
    "html_url": "https://github.com/octokit/octokit.rb/tree/master/lib/octokit",
    "download_url": null,
    "_links": {
      "self": "https://api.github.com/repos/octokit/octokit.rb/contents/lib/octokit",
      "git": "https://api.github.com/repos/octokit/octokit.rb/git/trees/a84d88e7554fc1fa21bcbc4efae3c782a70d2b9d",
      "html": "https://github.com/octokit/octokit.rb/tree/master/lib/octokit"
    }
  }
]
*/
