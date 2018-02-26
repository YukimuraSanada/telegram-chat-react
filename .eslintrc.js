module.exports = {
  "parser": "babel-eslint",
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  // "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 7,
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
