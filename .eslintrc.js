module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  // "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always",
      { "omitLastInOneLineBlock": false }
    ]
  }
};
