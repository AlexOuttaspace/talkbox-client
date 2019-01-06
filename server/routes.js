const routes = require('next-routes')

// See https://github.com/fridays/next-routes
module.exports = routes()
  .add('register')
  .add('login')
  .add('create-team')
  .add({
    name: 'team',
    pattern: '/team/:teamId'
  })
