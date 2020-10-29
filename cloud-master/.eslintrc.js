module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module"
  },

  globals: {
    TCIC: null
  },

  rules: {
    "no-empty": "off",
    "no-unused-vars": "off",
    "no-alert": 2,
    "no-console": "off", // 允许在代码中保留 console 命令
    "linebreak-style": "off"
  }
};
