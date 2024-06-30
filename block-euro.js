// set element's visibility to none
const elementInvisible = (el) => {
  el.style.display = 'none'
}

// key lookup in list
const hasKey = (list, key) => {
  for (const el of list) {
    if (el === key) {
      return true
    }
  }
  return false
}

// log shortcut for debugging
const logSrc = (src) => {
  console.log(src, 'refers to EURO!')
}

// regex for best 16 of EURO
const bestSixteen = /Deutschland|Schweiz|Italien|Dänemark|England|Slowakei|Spanien|Georgien|Frankreich|Belgien|Portugal|Slowenien|Rumänien|Niederlande|Österreich|Türkei/

// regex for reference to final rounds
const finals = /(EM-)?(Achtel|Viertel|Halb)?(F|f)inal(e|s|es)/

// check text for EURO content
const hasEuro = (text, url) => {
  const euroSnippet = /(\/|-)(em-|fussball-em|europameisterschaft|fussball-europameisterschaft)/ // needs a leading hyphen or slash
  return url
    ? euroSnippet.test(text)
    : refersToEuro(text)
}

// more 'sophisticated' check for references to EURO
const refersToEuro = (text) => {
  let euroReference = false
  euroReference = /.*(Fußball-EM|Fußball-Europameisterschaft|UEFA(|-)EURO).*/.test(text)
  if (/Europameisterschaft|EM/.test(text)) {
    euroReference = bestSixteen.test(text) && finals.test(text)
  }
  return euroReference
}


// remove EURO from navigation topics
const topicList = document.getElementsByClassName('navigation-topics__link')
for (const link of topicList) {
  if (hasEuro(link.href, true)) {
    elementInvisible(link)
  }
}

// remove ticker container
const tickerContainer = document.getElementsByClassName('wm-ticker')
if (tickerContainer.length === 1) {
  elementInvisible(tickerContainer[0])
}

// check link URL, title and text for references to EURO
const linkHasEuro = (link) => {
  return hasEuro(link.href, true) || hasEuro(link.title) || hasEuro(link.innerHTML)
}

// more checks for references to German Team w/o mentioning EURO
const hasGER = (text) => {
  const vsGER = /(((–|-|gegen) )Deutschland)|(Deutschland( (–|-|gegen)))/
  const buzzwords = /Nationalmannschaft|Havertz|Füllkrug|Nagelsmann|DFB-(Elf|Auswahl|Team)/
  return vsGER.test(text) || buzzwords.test(text)
}


// checks for references of final rounds or best 16 teams w/o EURO
const hasFinals = (text) => {
  const sixTeen = new RegExp(bestSixteen)
  const finalRounds = new RegExp(finals)
  const finalsCheck = new RegExp(sixTeen.source + " (–|-|gegen) " + finalRounds.source)
  return finalsCheck.test(text) || finals.test(text)
}


// check if article has references to EURO in link or teaser text
const articleHasEuro = (article) => {
  const articleLink = article.children[0]
  const articleTeaser = article.children.length > 2
    ? article.children[2].children[1].innerHTML // teaser with image
    : article.children[1].children[1].innerHTML // teaser w/o image
  return linkHasEuro(articleLink) || hasEuro(articleTeaser) || hasGER(articleTeaser) || hasGER(articleLink) || hasFinals(articleLink) || hasFinals(articleTeaser)

}

// check article teasers for EURO content, set invisible if present
const articles = document.getElementsByTagName('article')
for (const article of articles) {
  if ((hasKey(article.classList, 'zon-teaser') && articleHasEuro(article)) || // article on home page
      (hasKey(article.classList, 'topicbox-item' && linkHasEuro(article.children[0])))) { // article within pages
    if (hasKey(article.parentElement.classList, 'zon-carousel__slide')) { // is carousel element
      elementInvisible(article.parentElement)
    } else { // is own teaser
      elementInvisible(article)
    }
  }
}

// return true if links or strong text refer to EURO
const tickerRelateToEuro = (news) => {
  for (const node of news.children) {
    if (node.nodeName === 'A' && hasEuro(node.href, true)) { // link
      return true
    } else if (node.nodeName === 'STRONG' && hasEuro(node.innerHTML)) { // strong tag
      return true
    }
  }
  return false
}

// check ticker news, filter out any mentioning EURO
const tickerNews = document.getElementsByClassName('zon-markup-with-author__content') // list of HTML elements, length 1
if (tickerNews.length > 0) {
  for (const news of tickerNews[0].children) {
    if (news.children.length >= 2) { // is news entry (strong and at least one link)
      if (tickerRelateToEuro(news)) {
        elementInvisible(news)
      }

    }
  }
}

// on "sport" page, suppress "Alles zur EM" box
const sections = document.getElementsByTagName('section') // dividing elements on page
for (const section of sections) {
  for (const tag of section.attributes) {
    if (tag.nodeName === 'data-ct-context' && tag.nodeValue === 'headed-alles_zur_fussball-em') { // is that box
      elementInvisible(section.parentElement)
      break
    }
  }
}
