import fs from 'fs/promises'

async function writeInFile(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

export default writeInFile