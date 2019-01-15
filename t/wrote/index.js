import { rm, write, read, ensurePath, readDirStructure } from '@wrote/wrote'

(async () => {
  const file = 'wrote/test.txt'
  await ensurePath(file)
  await write(file, 'data')
  const r = await read(file)
  console.log(r)
  const dir = await readDirStructure('wrote')
  console.log(dir)
  await rm('wrote')
  try {
    await readDirStructure('wrote')
    throw new Error('The dir was not removed.')
  } catch (err) {
    console.log(err.message)
  }
})