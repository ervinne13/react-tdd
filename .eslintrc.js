const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    env: {
        "browser": true,
        "amd": true,
        "node": true,
        "jest/globals": true,
        "cypress/globals": true,
    },
    extends: [
        "codingitwrong",
    ],
    plugins: [
        "jest",
        "cypress",
        "react",
    ],
    parser: "babel-eslint",
    rules: {
        "indent": [WARN, 4],
    },
};
