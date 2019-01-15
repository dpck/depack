import { rm } from '@wrote/wrote'
import { h, render } from 'preact'
import { test } from './lib'

(async () => {
  await rm(test())
})()
render(h('div'), document.body)