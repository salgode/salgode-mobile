module.exports = {
  parser: "babel-eslint",
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    browser: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  plugins: [
    "prettier",
    "react",
    "react-native"
  ],
  "globals": {
    "React": "readonly"
  },
  rules: {
    "prettier/prettier": ["error", {
      trailingComma: "es5",
      semi: false,
      singleQuote: true,
    }],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-var": "error",
    "eqeqeq": ["error", "smart"],
    "react-native/no-color-literals": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/display-name": 1,
    "react/prop-types": 1,
    "react-native/no-inline-styles": 1,
    "react-native/no-raw-text": "off"
  }
};
