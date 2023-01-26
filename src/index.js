import axios from 'axios'
import dotenv from 'dotenv'
import cron from 'node-cron'
import path from 'path'
import { readFile, writeInFile } from './utils/IOInFiles/index.js'
import { getElPropContent, getRawDomEls, openTab } from './utils/scraper/index.js'
dotenv.config()

class Notifier {
  constructor() {
    this.rootPath = path.join(process.cwd(), '/cache.json')
  }

  async watch() {
    let lastUpdates = []
    const chaptersTab = await openTab(process.env.WATCHED_URL)
    const chaptersLiEls = await getRawDomEls(chaptersTab, '.list-chapter li')
    const lastCached = await readFile(this.rootPath)

    for (let i = Number(lastCached.chapter); i < chaptersLiEls.length; i++) {
      const chapter = await getElPropContent({
        rawUnAccesibleElList: chaptersLiEls,
        elIndex: i,
        HTMLTag: 'a',
        HTMLproperty: 'textContent'
      })
      // save the reference to the new chapters
      lastUpdates.push(chapter.trim().split(' ')[1])
    }
    await chaptersTab.close()

    if (lastUpdates.length > 0) {
      this.notify(`Nuevos capitulos: ${lastUpdates.join(', ')}`)
      await writeInFile(this.rootPath, {chapter: lastUpdates.at(-1)})
      lastUpdates = []
    }
  }

  async notify(data) {
    console.log('Yeay! new chapter')
    await axios.post(process.env.URL, {
      content: data
    })
  }
}

const notifier = new Notifier

// should run every 10 min -> apartir de las 00:00 debe comenzar a observar todos los dias
cron.schedule('*/15 * * * *', () => {
  console.log('App running!')
  notifier.watch()
})
