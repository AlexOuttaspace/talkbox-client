const routes = require('next-routes')

// See https://github.com/fridays/next-routes
module.exports = routes()
  .add('register', '/register')
  .add('login', '/login')
  .add('create-team', '/create-team')
  .add('/team/:teamId?/:messageTarget(channel|user)?/:messagesId?', 'team')
