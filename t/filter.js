const items = [
  { internal: true },
  { entry: 'hello' },
]

const fi = items.filter(Item => {
  const { entry } = Item
  return entry
})

const fi2 = items.filter(Item => {
  return Item.entry
})

console.log(fi)
console.log(fi2)