/* eslint-env browser */
export default function __$styleInject(css = '') {
  try { if (!document) return } catch (err) { return }
  const head = document.head
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet){
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  head.appendChild(style)
}