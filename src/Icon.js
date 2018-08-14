import React from 'react'
import PropTypes from 'prop-types'

const Icon = (
    width,
    height,
    viewBox,
    title,
    desc,
    children,
    ...rest
) => (
    <svg
        aria-hidden={title ? 'false' : 'true'}
        {...props}>
        { title ? <title id={props['aria-labelledby']}>{title}</title> : null }
        { desc ? <desc id={props['aria-describedby']}>{desc}</desc> : null }
        {children}
    </svg>
)

Icon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    viewBox: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    children: PropTypes.node.isRequired
}

Icon.defaultProps = {
    fill: 'currentColor',
    height: '1em',
    width: '1em'
}

export default Icon