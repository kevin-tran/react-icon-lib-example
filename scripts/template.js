
'use strict';

exports.template = async (code, config, state) => {
    const props = getProps(config)

    const result = `import React from 'react'\n\n
    const ${state.componentName} = ${props} => ${code}\n\n
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
