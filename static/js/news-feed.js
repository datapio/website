const fetch_articles = async (authors, categories) => {
  const promises = authors
    .map(author => `https://medium.com/feed/@${author}`)
    .map(feed => `https://api.rss2json.com/v1/api.json?rss_url=${feed}`)
    .map(async url => {
      const res = await fetch(url)
      const data = await res.json()
      return data.items.filter(post => {
        if (post.categories.length > 0) {
          for (const category of categories) {
            if (post.categories.indexOf(category) !== -1) {
              return true
            }
          }
        }

        return false
      })
    })

  const posts = await Promise.all(promises)
  return posts
    .flatMap(postList => postList)
    .sort((item, other) => {
      if (item.pubDate < other.pubDate) {
        return 1
      }
      else if (item.pubDate > other.pubDate) {
        return -1
      }
      return 0
    })
}

const render_articles = (articles, div) => {
  for (const article of articles) {
    const item = $('<div/>', { class: 'timeline-item' })
    const marker = $('<div/>', { class: 'timeline-marker' })
    const content = $('<div/>', { class: 'timeline-content' })
    const heading = $('<p/>', { class: 'heading', text: moment(article.pubDate).format('dddd, MMMM Do, YYYY') })
    const description = $('<a/>', { text: article.title, href: article.link, target: '_blank' })

    content.append(heading)
    content.append(description)
    item.append(marker)
    item.append(content)
    div.append(item)
  }
}

$(() => {
  const articlesDiv = $('#articles')
  const authors = articlesDiv.data('authors')
  const categories = articlesDiv.data('categories')
  fetch_articles(authors, categories).then(
    articles => render_articles(articles, articlesDiv),
    console.error
  )
})
