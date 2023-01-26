import { browser } from '../variables.js'


export default async function openTab(url) {
  const tab = await browser.newPage()
  await tab.goto(url, { waitUntil: 'networkidle2' })
  return tab
}