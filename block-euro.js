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

// check text for EURO content
const hasEuro = (text, url) => {
  const euroSnippet = url
    ? /(\/|-)(em-|fussball-em|europameisterschaft|fussball-europameisterschaft)/ // needs a leading hyphen or slash
    : /.*(Fußball-EM|Fußball-Europameisterschaft|UEFA EURO).*/
  return euroSnippet.test(text)
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

const articleHasEuro = (article) => {

  const articleLink = article.children[0]
  const articleTeaser = article.children.length > 2
    ? article.children[2][1] // teaser with image
    : article.children[1][1] // teaser w/o image
  if (hasEuro(articleLink.href, true)) {
    console.log(articleLink.href, 'refers to EURO')
  } else if (hasEuro(articleLink.title)) {
    logSrc(articleLink.title)
  } else if (hasEuro(articleLink.innerHTML)) {
    logSrc(articleLink.innerHTML)
  } else if (hasEuro(articleTeaser)) {
    logSrc(articleTeaser)
  }
  return linkHasEuro(articleLink) || hasEuro(articleTeaser)

}

// check article teasers for EURO content, set invisible if present
const articles = document.getElementsByTagName('article')
for (const article of articles) {
  if (hasKey(article.classList, 'zon-teaser') && articleHasEuro(article)) {
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
for (const news of tickerNews[0].children) {
  if (news.children.length >= 2) { // is news entry (strong and at least one link)
    if (tickerRelateToEuro(news)) {
      elementInvisible(news)
    }

  }
}
