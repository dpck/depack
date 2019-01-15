import { render, h } from '../../../../node_modules/preact/dist/preact.mjs'

const Component = () => h('div',{},`
  `,h('span',{},`Test`),`
`)

render(h(Component), document.body)