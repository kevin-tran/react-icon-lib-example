const JSXElement = require('h2x-plugin-jsx').JSXElement;
const JSXText = require('h2x-plugin-jsx').JSXText;

const hasDesc = node =>
  node.children.reduce((accumulation, value) => {
    if (value.text !== '{ desc && <desc id={props["aria-describedby"]}>{desc}</desc> }') return accumulation
    return true
  }, false)

exports.descProp = () => () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'svg') {
          if (hasDesc(path.node)) return false

          if (!path.node.children.some(children => children.name === 'desc')) {
            const element = new JSXElement()
            const text = new JSXText()

            text.text = '{ desc && <desc id={props["aria-describedby"]}>{desc}</desc> }'

            element.name = 'desc'
            element.children.push(text)
            path.node.children.unshift(text)
          }
        }
      },
    },
  },
})
