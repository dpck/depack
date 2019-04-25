try {
  throw new Error('example')
} catch ({ stack }) {
  console.log(stack)
}