module.exports = {
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    'babel',
  ],
  extends: [
    'airbnb-base',
  ],
};
