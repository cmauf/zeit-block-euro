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

// check text for EURO content
const hasEuro = (text, url) => {
  const euroSnippet = url
    ? /(\/|-)(em|fussball-em|europameisterschaft|fussball-europameisterschaft)(\/|-)?/ // needs a leading hyphen or slash
    : /.(Fußball-EM|Fußball-Europameisterschaft|UEFA EURO)./
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

// check article teasers for EURO content, set invisible if present
const articles = document.getElementsByTagName('article')
for (const article of articles) {
  if (hasKey(article.classList, 'zon-teaser') &&
     hasEuro(article.children[0].href, true)
  ) {
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
    console.log(node)
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
    console.log(news)
    if (tickerRelateToEuro(news)) {
      elementInvisible(news)
    }

  }
}
