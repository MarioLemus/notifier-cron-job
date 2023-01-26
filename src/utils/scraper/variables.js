import puppeter from 'puppeteer'

const browser = await puppeter.launch({ 
  headless:true,
  executablePath: '/usr/bin/chromium-browser'
})

export {
  browser
}