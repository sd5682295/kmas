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
  router.get('/:author/:table/list',app.list)
  router.post('/:author/:table/add',app.add)
  router.post('/:author/:table/update/:id',app.update)
  router.delete('/:author/:table/:id',app.del)


  return router
}