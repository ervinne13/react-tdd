

## Unit Testing: Setup

Currently using Jest and Enzyme for this. Setting it up to work with imports would need a transpiler though. This is where `"@babel/plugin-syntax-dynamic-import` comes in. The following commands was used to install it:

```cmd
yarn add --dev @babel/core @babel/plugin-syntax-dynamic-import babe-jest babe-core@^7.0.0-0
```

Of course, a `.babelrc` file is required so we set it up like so:

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```