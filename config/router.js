'use strict'

const Router = require('koa-router')
const app = require('../app/controllers/app')

module.exports = function(){
	var router = new Router({
    prefix: '/kmas'
  })

  // DB Interface test
  // router.get('/list',User.list)
  // router.post('/add',User.add)
  // router.post('/update',User.update)
  // router.post('/delete',User.del)
  // router.get('/mongodb/findQuery',User.findQuery)
  router.get('/list',app.list)
  // router.post('/add',app.add)
  // router.post('/update',app.update)
  // router.post('/delete',app.del)


  return router
}