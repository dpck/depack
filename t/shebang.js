try {
  throw new Error('error')
} catch ({ stack }) {
  console.log(stack)
}