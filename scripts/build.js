const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const del = require('del');
const svgr = require('@svgr/core').default;
const template = require('./template').template;
const transform = require('babel-core').transform;

const icons = path.join(__dirname, '../src/icons');
const output = path.join(__dirname, '../build');

del.sync(output);

glob(`${icons}**/*.svg`, (err, files) => {
    files.forEach(file => {

        const fileName = path.basename(file, '.svg');

        fs.readFile(file, 'utf8', (err, svgContent) => {
            if (err) return console.log(err);

            convertSVGString(svgContent, fileName);
        });
    });

    const index = files.reduce((mainFile, file) => {
        const fileName = path.basename(file, '.svg');

        return `${mainFile}\n export { default as ${fileName} } from './${fileName}.js';`;
    }, '');

    fs.outputFile(path.join(output, 'index.js'), index);
});

function convertSVGString(svgContent, fileName) {
    svgr(svgContent, { icon: true, newTitleProp: true, descProp: true, childrenProp: true, template: template }, { componentName: fileName })
        .then(component => {
            buildJSFile(component, fileName);
            buildTypeFile(fileName);
        });
}

function buildJSFile(component, fileName) {
    console.log(`building ${fileName} component`);
    fs.outputFile(path.join(output, `${fileName}.js`), transpileCode(component));
}

function transpileCode(source) {
    return transform(source, {
        presets: ['es2015', 'env', 'react'],
        plugins: ['transform-object-rest-spread']
    }).code;
}

function buildTypeFile(fileName) {
    const typesTemplate = `
    import * as React from 'react';
    export interface IProps extends React.SVGProps<React.SVGElement> {
        title: string;
        desc: string;
        children?: React.ReactNode;
    }

    export default class ${fileName} extends React.Component<IProps> { }
    `;

    fs.outputFile(path.join(output, `${fileName}.d.ts`), typesTemplate);
}
