'use strict'

const JSXText = require('h2x-plugin-jsx').JSXText

const hasChildren = node =>
  node.children.reduce((accumulation, value) => {
    if (value.text !== '{children}') return accumulation
    return true
  }, false)

exports.childrenProp = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'svg') {
          if (hasChildren(path.node)) return false

          if (!hasChildren(path.node)) {
            const text = new JSXText()

            text.text = '{children}'

            path.node.children.push(text)
          }
        }
      },
    },
  },
})
