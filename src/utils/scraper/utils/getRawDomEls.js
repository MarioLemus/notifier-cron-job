
/**
* Get all DOM elements from a browser page and return the list of un-accesible elements. 
* These need to be cicled to get their data
*
* @param {browserObject} tabInstance - Main instance of your chromium browser
* @param {string} attributeID - Dom's elements ids (HTML attribute > "class, id")
*/
async function getRawDomEls(tabInst, attrID) {
  const rawDomList = await tabInst.$$(attrID)
  return rawDomList
}

export default getRawDomEls