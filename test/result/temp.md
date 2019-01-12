// processes the entry
test/fixture/project/index.jsx

/* expected */
# test/fixture/project/index.jsx

import { h } from '../../../../../node_modules/preact/dist/preact.mjs'
import Test from './test.jsx'

export const Component = () => h('div',{},`
  `,h('title',{},`Hello World`),`
  `,h(Test),`
`)

# test/fixture/project/test.jsx

import { h } from '../../../../../node_modules/preact/dist/preact.mjs'
import RichTextArea from '../../../../../node_modules/preact-richtextarea/dist/preact-richtextarea.js'

const Test = () => h('form',{},`
  `,h(RichTextArea,{'value':"test"}),`
`)

export default Test
/**/