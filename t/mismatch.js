const Detect = () => {
  const detected = detect()
  // this causes destructuring to be .map((a)=>({from:a}=a))
  // const f = detected.map((ff) => {
  //  const newF = { ...ff }
  //  return newF
  // })
  return detected
}

const detect = () => {
  const matches = getMatches() // supposed to be array of strings
  const [m] = matches
  if (m !== 'number') throw new Error(`m is ${JSON.stringify(m)}`)
  return matches.map(m => ({ type: m }))
}

const getMatches = () => {
  const r = [
    { test: Infinity, from: 'number' },
    { test: 'string', from: 'string' },
    { test: false, from: 'boolean' },
  ]
  const res = r.map(({ from }) => from)
  return res
}

console.log(Detect())
