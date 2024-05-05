const { readAndUpload, createSecretUpdater } = require('github-secret-dotenv');
const fs = require('fs');
const dotenv = require('dotenv').config({
  path: './.env.local',
});

const config = {
  owner: process.env.GITHUB_REPOSITORY.split('/')[0],
  repo: process.env.GITHUB_REPOSITORY.split('/')[1],
  githubAccessToken: process.env.GITHUB_TOKEN,
  envFilePath: process.env.ENV_FILE,
};

const main = async () => {
  await readAndUpload({
    ...config,
  });

  const secretUpdater = createSecretUpdater({
    githubAccessToken: config.githubAccessToken,
    owner: config.owner,
    repo: config.repo,
  });

  const sshKey = fs.readFileSync('./keys/privateKey', 'utf8');
  await secretUpdater('SSH_PRIV_KEY', sshKey);
};

main();
