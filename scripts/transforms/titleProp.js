'use strict'

const JSXText = require('h2x-plugin-jsx').JSXText

const hasTitle = node =>
  node.children.reduce((accumulation, value) => {
    if (value.text !== '{ title && <title id={props["aria-labelledby"]}>{title}</title> }') return accumulation
    return true
  }, false)

exports.titleProp = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'svg') {
          if (hasTitle(path.node)) return false

          if (!hasTitle(path.node)) {
            const text = new JSXText()

            text.text = '{ title && <title id={props["aria-labelledby"]}>{title}</title> }'

            path.node.children.unshift(text)
          }
        }
      },
    },
  },
})
