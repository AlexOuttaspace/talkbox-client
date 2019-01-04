const routes = require('next-routes')

// See https://github.com/fridays/next-routes
module.exports = routes()
  .add({
    name: '',
    pattern: '/',
    page: 'dashboard'
  })

  .add({
    name: 'register',
    pattern: '/register',
    page: 'register'
  })
  .add({
    name: 'login',
    pattern: '/login',
    page: 'login'
  })

  .add({
    name: 'chat',
    pattern: '/chat',
    page: 'chat'
  })
