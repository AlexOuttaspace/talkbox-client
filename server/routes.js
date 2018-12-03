const routes = require('next-routes')

// See https://github.com/fridays/next-routes
module.exports = routes().add({
  name: '',
  pattern: '/',
  page: 'dashboard'
})
