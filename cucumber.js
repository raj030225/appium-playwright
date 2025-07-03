const config = {
  requireModule: [
    'ts-node/register'
  ],
  require: [
    'src/step-definitions/**/*.ts'
  ],
  format: [
    '@cucumber/pretty-formatter'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  timeout: 300000 // 5 minutes
};

module.exports = {
  default: config
};
