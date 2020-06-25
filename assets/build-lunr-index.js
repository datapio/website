const matter = require('gray-matter')
const glob = require('glob')
const lunr = require('elasticlunr')
const fs = require('fs')

const pattern = process.env.LUNR_PATTERN || 'content/**'
const idx_target = process.env.LUNR_INDEX_TARGET || 'static/search-index.json'
const db_target = process.env.LUNR_DB_TARGET || 'static/search-db.json'

const idx = lunr(function() {
  const self = this

  self.setRef('uri')
  self.addField('title')
  self.addField('abstract')
  self.addField('seeAlso')
  self.addField('content')

  glob.sync(pattern, {}).forEach(file => {
    if (fs.lstatSync(file).isFile()) {
      console.log('--- Indexing', file)
      const content = fs.readFileSync(file).toString('utf-8')
      const record = matter(content)

      const doc = {
        uri: file.replace(/^(content\/)/, '/').replace(/(\.md)$/, '').replace(/(\/_index)$/, ''),
        content: record.content,
        ...record.data
      }

      self.addDoc(doc)
    }
  })
})

console.log('--- Writing index')
fs.writeFileSync(idx_target, JSON.stringify(idx, null, 2))
