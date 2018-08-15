import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({
    title,
    desc,
    children,
    ...props
}) => (
        <svg
            aria-hidden={title ? 'false' : 'true'}
            {...props}>
            {title ? <title id={props['aria-labelledby']}>{title}</title> : null}
            {desc ? <desc id={props['aria-describedby']}>{desc}</desc> : null}
            {children}
        </svg>
    )

Icon.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    viewBox: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    children: PropTypes.node.isRequired,
    preserveAspectRatio: PropTypes.string
}

Icon.defaultProps = {
    fill: 'currentColor',
    height: '1em',
    width: '1em',
    viewBox: '0 0 50 50',
    preserveAspectRatio: 'none'
}

Icon.displayName = 'Icon'

export default Icon