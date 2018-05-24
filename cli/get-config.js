const fs = require('fs');

const mergeFileConfigWithArgs = (fileConfig, args) => {
  return fileConfig;
};

const validateConfig = config => {
  return config;
};

module.exports = (configPath, args) => {
  try {
    const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    return validateConfig(mergeFileConfigWithArgs(fileConfig, args));
  } catch (e) {
    console.log('E: ', e);
    return validateConfig(mergeFileConfigWithArgs({}, args));
  }
};
