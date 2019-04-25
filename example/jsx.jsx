import { render } from 'preact'

const Component = ({ hello, world }) => {
  return <div onClick={() => {
    console.log(hello)
  }} id={world} />
}

render(<Component hello="world" world="jsx" />, document.body)