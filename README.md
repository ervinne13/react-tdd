# Application Setup

## # Parcel

One of the key painpoints on the previous iterations of the worklogs application is the development workflow. The build tools we are currently using is relatively fast, but not fast enough to prevent distractions as building after every update in code takes at least a good 10 or more seconds. Parcel is nice as it works out of the box (at least until we do some complex stuff) but would perform exceptionally faster when ran consecutively (it would do a full build first, then seem to do some caching to make the next builds a whole lot faster).

We'll just need to add a few dependencies so that it can handle our stuff in react easily.

### Class Properties Support

For stuff like:

```jsx
class App extends React.Component {
    state = { foo: 'bar' };
    //  ...
```

... we'll be needing to install:

```cmd
yarn add --dev @babel/core @babel/plugin-proposal-class-properties
```

... and add it to the `.babelrc` like so:

```json
    //  ...
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    //  ...
```

## #Unit Testing

### 1: Enabling the `import * from *` syntax

**TODO: This seems like it's not required anymore and actually causes duplicate plugins when ran with parcel. Re-do this documentation later.**

Currently using Jest and Enzyme for this. Setting it up to work with imports would need a transpiler though. This is where `"@babel/plugin-syntax-dynamic-import` comes in. The following commands was used to install it:

```cmd
yarn add --dev @babel/plugin-syntax-dynamic-import babe-jest babe-core@^7.0.0-0
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

### 2: Handling JSX

We're gonna need a react preset for babel on this so we'll do:

```
yarn add --dev @babel/preset-react
```

And update our `.babelrc`'s `presets` key and add in `@babel/preset-react` inside it.

## #Linter

For the linter, we will opt to use `eslint-config-codingitwrong` from https://github.com/CodingItWrong/eslint-config-codingitwrong. We're gonna install our linter like so:

```cmd
yarn add --dev eslint eslint-config-codingitwrong babel-eslint
```

You'll be needing Jest, Cypress and React plugins for eslint so that your tests wont generate errors on the linter.

```cmd
yarn add --dev eslint-plugin-jest eslint-plugin-cypress eslint-plugin-react
```

And add the plugin like so:

```json
{
    //  ...
    plugins: [
        "jest",
        "cypress",
        "react",
    ],
    //  ...
}
```

And the globals of jest and cypress should be set on the "`env`" like so:

```json
{
    //  ...
    env: {
        /// ...
        "jest/globals": true,
        "cypress/globals": true,
    },
    //  ...
}
```