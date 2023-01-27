import puppeter from 'puppeteer'

const browser = await puppeter.launch({
  headless:true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
})

export {
  browser
}