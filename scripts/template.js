
'use strict';

const htmlParser = require('html-parse-stringify2')

exports.template = async (code, config, state) => {
    const props = getProps(config)
    
    const svgTag = code.substring(0, code.indexOf('{...props}>') + 11);
    const svgToHtml = htmlParser.parse(code)
    const viewBox = svgToHtml[0].attrs.viewBox
    const formattedCode = stripeSvgTags(code, svgTag.length)

    const result = `import React from 'react'\n\n
    import { Icon } from './icon'\n\n
    const ${state.componentName} = ${props} => 
    <Icon viewBox='${viewBox}' {...props}>
    {children}
    ${formattedCode}
    </Icon>
    export default ${state.componentName}`

    return result
}

// creates the props for the outputted component
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

const stripeSvgTags = (source, initialSlice) => source.slice(initialSlice, -7)