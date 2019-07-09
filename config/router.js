'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
// const App = require('../app/controllers/app')

module.exports = function(){
	var router = new Router({
    prefix: '/db/mongodb'
  })

  // DB Interface test
  router.get('/list',User.list)
  router.post('/add',User.add)
  router.post('/update',User.update)
  router.post('/delete',User.del)
  // router.get('/mongodb/findQuery',User.findQuery)

  return router
}