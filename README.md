

## Unit Testing: Setup

### Setup.1: Enabling the `import * from *` syntax

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

Take note that **we didn't actually need it for the actual application as Parcel handles that for us**. Jest can't do that automatically though.

### Setup.2: Handling JSX

We're gonna need a react preset for babel on this so we'll do:

```
yarn add --dev @babel/preset-react
```

And update our `.babelrc`'s `presets` key and add in `@babel/preset-react` inside it.