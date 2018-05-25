const fs = require('fs');

const mergeFileConfigWithArgs = (fileConfig, args) => {
  console.log('Args: ', args);
  return Object.assign({}, fileConfig, args);
};

const validateConfig = config => {
  if (!config.glob) {
    throw 'Glob is required';
  }

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
