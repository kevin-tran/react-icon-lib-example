'use strict';

const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')
const del = require('del')
const svgr = require('@svgr/core').default
const template = require('./template').template
const transform = require('babel-core').transform
const version = require('../package.json').version

const icons = path.join(__dirname, '../src/icons')
const output = path.join(__dirname, '../build')

del.sync(output)

glob(`${icons}**/*.svg`, (err, files) => {
    files.forEach(file => {

        const fileName = path.basename(file, '.svg')

        fs.readFile(file, 'utf8', (err, svgContent) => {
            if (err) return console.log(err);

            convertSVGString(svgContent, fileName);
        });
    });

    fs.outputFile(path.join(output, 'package.json'), getPackageJsonSource(version));
});

const convertSVGString = (svgContent, fileName) => {
    svgr(svgContent, { icon: true, newTitleProp: true, descProp: true, childrenProp: true, template: template }, { componentName: fileName })
        .then(component => {
            buildJSFile(component, fileName);
            buildTypeFile(fileName);
        })
}

const buildJSFile = (component, fileName) => {
    console.log(`building ${fileName} component`);
    fs.outputFile(path.join(output, `${fileName}.js`), transpileCode(component));
}

const transpileCode = (source) => {
    return transform(source, {
        presets: ['es2015', 'env', 'react'],
        plugins: ['transform-object-rest-spread']
    }).code
}

const buildTypeFile = (fileName) => {
    const typesTemplate = `
    import * as React from 'react';
    export interface IProps extends React.SVGProps<SVGElement> {
        title: string;
        desc: string;
        children?: React.ReactNode;
    }

    export default class ${fileName} extends React.Component<IProps> { }
    `;

    fs.outputFile(path.join(output, `${fileName}.d.ts`), typesTemplate);
}

const getPackageJsonSource = (version) => `{
    "name": "react-icon-test",
    "version": "${version}",
    "peerDependencies": {
      "react": ">=15"
    }
  }`