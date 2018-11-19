import transform from '../../lib/transform'

const Analyze = async (src) => {
  console.log(src)
  await transform(src)
}

export default Analyze