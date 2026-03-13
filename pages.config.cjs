const { URL } = require('url');
const path = require('path');
const { execSync } = require('child_process');

const DEFAULT_OWNER = 'zaferayan';
const DEFAULT_REPO_NAME = 'microfrontend-demo';

function normalizeBasePath(value) {
  if (!value || value === '/') {
    return '';
  }

  const normalized = `/${value}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  return normalized === '/' ? '' : normalized;
}

function joinUrlPath(...segments) {
  return segments
    .filter(Boolean)
    .map((segment) => segment.replace(/^\/+|\/+$/g, ''))
    .join('/');
}

function getRepositoryFromGitRemote() {
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', {
      cwd: path.resolve(__dirname),
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim();

    if (!remoteUrl) {
      return {};
    }

    const normalizedUrl = remoteUrl.replace(/^git@github\.com:/, 'https://github.com/');
    const match = normalizedUrl.match(/github\.com[/:]([^/]+)\/(.+?)(?:\.git)?$/);

    if (!match) {
      return {};
    }

    return {
      repositoryOwner: match[1],
      repositoryName: match[2]
    };
  } catch {
    return {};
  }
}

function getPagesConfig() {
  const repository = process.env.GITHUB_REPOSITORY;
  const [repositoryOwner, repositoryName] = repository ? repository.split('/') : [];
  const gitRemoteRepository = getRepositoryFromGitRemote();

  const owner =
    process.env.PAGES_OWNER ||
    process.env.GITHUB_REPOSITORY_OWNER ||
    repositoryOwner ||
    gitRemoteRepository.repositoryOwner ||
    DEFAULT_OWNER;
  const repoName =
    process.env.PAGES_REPO_NAME ||
    repositoryName ||
    gitRemoteRepository.repositoryName ||
    DEFAULT_REPO_NAME;
  const basePath = normalizeBasePath(process.env.PAGES_BASE_PATH || `/${repoName}`);
  const origin = (process.env.PAGES_ORIGIN || `https://${owner}.github.io`).replace(/\/$/, '');

  return {
    owner,
    repoName,
    basePath,
    origin,
    remoteEntryUrl(appName) {
      return new URL(joinUrlPath(basePath, appName, 'remoteEntry.js'), `${origin}/`).toString();
    }
  };
}

function isGitHubPagesBuild() {
  return process.env.DEPLOY_TARGET === 'github-pages';
}

module.exports = {
  getPagesConfig,
  isGitHubPagesBuild,
  normalizeBasePath
};
