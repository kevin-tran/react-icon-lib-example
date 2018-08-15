[# react-icon-lib-example](https://kevin-tran.github.io/react-icon-lib-example/)

Example project for converting raw SVG's into a React component npm package

## Getting Started

```yarn build
```

Will kick off svgr, which will run the source icons through SVGO, then transpile the outputted string into valid JSX. After this, rollup will build the Icon container component into the same dist folder.

```yarn storybook
```

Will launch the storybook dev server, where you can play around with the newly created SVG components

## Built with

* [svgr](https://github.com/smooth-code/svgr)

## Inspired by

[Making SVG icon libraries for React apps] (http://nicolasgallagher.com/making-svg-icon-libraries-for-react-apps/)