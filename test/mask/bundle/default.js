import { makeTestSuite } from 'zoroaster'
import BundleTransform from '../../../src/lib/BundleTransform'

export const bundleTransform = makeTestSuite('test/result/bundle/BundleTransform.jsx', {
  getTransform() {
    const bt = new BundleTransform('test/fixture/bundle.js', 'temp-test')
    return bt
  },
})

// // quotes this.props
// class Comp extends Component {
//   render() {
//     const { onClick, className: cl, 't-m': t } = this.props
//     return <div id={this.props.id}/>
//   }
// }

// /* expected */
// class Comp extends Component {
//   render() {
//     const { 'onClick': onClick, 'className': cl, 't-m': t } = this.props
//     return <div id={this.props['id']}/>
//   }
// }
// /**/

// // quotes props
// const C = ({ abc }) => <div>{abc}</div>

// /* expected */
// const C = ({ 'abc': abc }) => <div>{abc}</div>
// /**/

// // quotes props in normal function
// const Col = ({ children, className, ...props }) => {
//   return children
// }

// /* expected */
// const Col = ({ 'children': children, 'className': className, ...props }) => {
//   return children
// }
// /**/