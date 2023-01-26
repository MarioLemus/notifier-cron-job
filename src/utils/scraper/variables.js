import puppeter from 'puppeteer'

const browser = await puppeter.launch({ headless:true })

export {
  browser
}