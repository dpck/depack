// processes a single file
import { h } from 'preact'

/* expected */
import { h } from '../node_modules/preact/dist/preact.mjs'
/**/

// quotes this.props
class Comp extends Component {
  render() {
    const { onClick, className: cl, 't-m': t } = this.props
    return <div id={this.props.id}/>
  }
}

/* expected */
class Comp extends Component {
  render() {
    const { 'onClick': onClick, 'className': cl, 't-m': t } = this.props
    return <div id={this.props['id']}/>
  }
}
/**/

// !quotes props
const C = ({ abc }) => <div>{abc}</div>

/* expected */
const C = ({ 'abc': abc }) => <div>{abc}</div>
/**/
