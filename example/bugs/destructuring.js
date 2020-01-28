(async () => {
  const data = await fetch('https://api.com')
  // should not be renamed
  const { 'hello': hello } = data
  console.log(hello)
})()