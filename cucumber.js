const config = {
  requireModule: [
    'ts-node/register'
  ],
  require: [
    'src/step-definitions/**/*.ts'
  ],
  format: [
    '@cucumber/pretty-formatter',
    'allure-cucumberjs/reporter'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  timeout: 120000 // 5 minutes
};

module.exports = {
  default: config
};
