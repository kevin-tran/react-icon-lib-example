
const Transform = require('h2x-core').transform;
const JSX = require('h2x-plugin-jsx').default;

const descProp = require('./transforms/descProp').descProp;
const titleProp = require('./transforms/titleProp').titleProp;
const childrenProp = require('./transforms/childrenProp').childrenProp;

exports.template = async (code, config, state) => {
    const props = getProps(config);

    const transformedCode = await transform(code, config, state);
    // not sure why when you run this through the JSX transform again it adds empty attributes in the svg, hack for now
    let formatCode = transformedCode.replace('{...props}=""', '{...props}');
    console.log(formatCode);

    let result = `import React from 'react'\n\n
    const ${state.componentName} = ${props} => ${formatCode}\n\n
    export default ${state.componentName}`

    console.log(result);

    return result
}

const getProps = config => {
    const props = []
    if (config.ref) props.push('svgRef')
    if (config.newTitleProp) props.push('title')
    if (config.descProp) props.push('desc')
    if (config.childrenProp) props.push('children')
    if (config.expandProps) props.push('...props')
    if (props.length === 0) return '()'
    if (props.length === 1 && config.expandProps) return 'props'

    return `({ ${props.join(', ')} })`
}

const plugins = [
    JSX,
    descProp(),
    titleProp(),
    childrenProp()
]

function transform(code) {
    return Transform(code, { plugins })
}