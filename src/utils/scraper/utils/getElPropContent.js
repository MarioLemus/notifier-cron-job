/**
 * 
 * @param {domEl[]} rawUnAccesibleElList - List of not accesible elements
 * @param {number} elIndex - Wanted element Index
 * @param {string} HTMLTag - Valid HTML tag
 * @param {string} HTMLproperty - HTML tag property from where data will be taken "i.e: textContent, href, etc"
 * @returns String: Dom's element property content
 */
async function getElPropContent({
  rawUnAccesibleElList, elIndex, HTMLTag, HTMLproperty}) {
  try {
    const rawEl = await rawUnAccesibleElList[elIndex].$(HTMLTag)
    const elContent = await rawEl.getProperty(HTMLproperty)
    const data = await elContent.jsonValue()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default getElPropContent