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

// check URL for EURO content
const urlHasEuro = (linkUrl) => {
  const euroSnippet = /(\/|-)(em|fussball-em|europameisterschaft)(\/|-)?/ // needs a leading hyphen or slash
  return euroSnippet.test(linkUrl)
}

// remove EURO from navigation topics
const topicList = document.getElementsByClassName('navigation-topics__link')
for (const link of topicList) {
  if (urlHasEuro(link.href)) {
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
      urlHasEuro(article.children[0].href)
  ) {
    if (hasKey(article.parentElement.classList, 'zon-carousel__slide')) { // is carousel element
      elementInvisible(article.parentElement)
    } else { // is own teaser
      elementInvisible(article)
    }
  }
}

// check ticker news, filter out any mentioning EURO
const tickerNews = document.getElementsByClassName('zon-markup-with-author__content') // list of HTML elements, length 1
for (const news of tickerNews[0].children) {
  if (news.children.length === 2 && urlHasEuro(news.children[1].href)) { // child #2 is link in ticker news
    elementInvisible(news)
  }
}
