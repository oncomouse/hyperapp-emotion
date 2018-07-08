import { h } from 'hyperapp'
import * as emotion from 'emotion'

const processTag = (tag, props) => {
  if (typeof tag === 'function') {
    if (tag.isStyledComponent) {
      return tag.getClassName()
    }
    return tag(props)
  }
  return tag
}

const styled = element => (strings, ...tags) => {
  let className = emotion.css(
    (typeof strings === 'function' ? '{}' : strings),
    ...(tags.map(tag => (typeof tag === 'function' ? 'inherit' : tag))),
  )
  function makeElement(element) {
    function style(props, children) {
      if (typeof strings === 'function') {
        className = emotion.css(strings(props))
      } else {
        const processedTags = tags.map(processTag)
        className = emotion.css(strings, ...processedTags)
      }
      return h(
        element, { ...props, className }, children,
      )
    }
    style.prototype.withComponent = element => makeElement(element)
    style.prototype.isStyledComponent = true
    style.prototype.getClassName = () => className

    return style
  }
  return makeElement(element)
}

export default styled
export * from 'emotion'
