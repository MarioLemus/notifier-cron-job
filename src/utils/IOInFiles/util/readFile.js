import fs from 'fs/promises'

async function readFile(path) {
  if (typeof path !== 'string') {
    throw new Error('Path file must be a string')
  }

  try {
    return JSON.parse(await fs.readFile(path))
  } catch (error) {
    console.error(error)
  }
}

export default readFile