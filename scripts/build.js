'use strict';

const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')
const svgr = require('@svgr/core').default
const template = require('./template').template
const transform = require('babel-core').transform

const icons = path.join(__dirname, '../src/icons')
const output = path.join(__dirname, '../dist')

// interate over svg files in src folder
glob(`${icons}**/*.svg`, (err, files) => {
    if (err) return console.log(err);

    files.forEach(file => {

        const fileName = path.basename(file, '.svg')

        fs.readFile(file, 'utf8', (err, svgContent) => {
            if (err) return console.log(err);

            convertSVGString(svgContent, fileName)
        });
    });
});

// take the source svg string and transpile into JSX
const convertSVGString = (svgContent, fileName) => {
    svgr(svgContent, { icon: true, childrenProp: true, template: template }, { componentName: fileName })
        .then(component => buildJSFile(component, fileName))
}


// take the outputted string from step above, transpile with babel and output the file
const buildJSFile = (component, fileName) => {
    console.log(`building ${fileName} component`);
    fs.outputFile(path.join(output, `${fileName}.js`), component)
}

// transpile the raw es6 code into usable es modules
const transpileCode = source => {
    return transform(source, {
        presets: ['es2015', 'env', 'react'],
        plugins: ['transform-object-rest-spread']
    }).code
}