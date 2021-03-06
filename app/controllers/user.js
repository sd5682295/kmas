'use strict'

const xss = require('xss')
const mongoose = require('mongoose')
const User = require('../models/user')
const { SuccessModel, ErrorModel } = require('../models/resModel')

// var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
// import userHelper from '../dbhelper/userHelper'

exports.list = async (ctx) => {
	const request = ctx.request
	const query = request.query
	console.log(`list ok1`)
	// try{
	// 	const author = xss(query.author)                             //尝试给author赋值，值
	// 	console.log('666')
	// 	}catch(err){                                                 //捕捉错误信息
	// 	// ctx.body ={'msg':'body.author 没有赋值,必须赋值才能看到相应数据列表'}   //给body黏贴错误提示："query.author未被赋值"
	// 	console.error(`query.author 没有赋值;错误信息为${err}`)        //打印错误信息
	// }
	const author = xss(query.author)
	if(!author){
		ctx.body ={'msg':'body.author 没有赋值,必须赋值才能看到相应数据列表'}   //给body黏贴错误提示："query.author未被赋值"
		console.error(`query.author 没有赋值;错误信息为${err}`)        //打印错误信息
		return
	}

	const limit_data = query.limit || 20                             //limit_data赋值，默认为20
	const page_data = query.page || 1                                //page_data赋值，默认为1         
	
	let find = User.find((author==='admin')&&{}||{"author":author});
	console.log(`--author:${author}--limit_data:${limit_data}--page_data:${page_data}`)
	await find                                                        //分页查询
		.skip((page_data-1) * limit_data)
        .limit(parseInt(limit_data))
		.exec(function(err, doc) {                                    //回调函数
		if (err) {
			ctx.body = new ErrorModel({err},'false to get list')
		} else {
			ctx.body = new SuccessModel({doc},'get list ok')
		}
	})


	// return 'list ok'
}
exports.add = async (ctx, next) => {
	let data = xss(ctx.request.body.data)
	// data = JSON.parse(data)
	if(data===''){
		data = []
	}else if(typeof data === 'string'&&data[0]!=='['){
		data = [{data:data}],
		console.log(`--data:${data}--typeof data:${typeof data}`)
	}else{
		data = JSON.parse(data)
	}
	const author = xss(ctx.request.body.author)
	const user = new User({
		data: data,
		author: author
	})
	let res_id = false
	try {
		await user.save()
		res_id = user.get("id")
		ctx.body = new SuccessModel({res_id},'save ok')
	} catch (e) {
		ctx.body = new ErrorModel({e},'false to save')

		return next
	}

	// return 'list ok'
}
exports.del = async (ctx, next) => {
	console.log('del ok')
	const author = xss(ctx.request.body.author)
	const id = xss(ctx.request.body.id)
	const remove_data = User.findByIdAndRemove(id,{
	author: author
	})
	let res = []
	await remove_data.exec(function(err, doc) {                                    //回调函数
		if (err) {
			ctx.body = new ErrorModel({err},'false to get list')
		} else {
			ctx.body = new SuccessModel({doc},'get list ok')
		}
	})
}

exports.update = async (ctx, next) => {
	console.log('开始update')
	const id = xss(ctx.request.body.id)
	console.log(`--ctx.request.body.id:${ctx.request.body.id}--ctx.request.body.data:${ctx.request.body.data}`)
	const update_str = JSON.parse(xss(ctx.request.body.data))
	console.log(`--update_str--${update_str}--typeof update_str--${typeof update_str}`)
	const update_data = User.findByIdAndUpdate(id,{data:update_str})
	let res = []
	await update_data.exec(function(err, doc) {
		if (err) {
			console.log('err')
			res = []
		} else {
			console.log(doc)
			res = doc;
		}
	})
	ctx.body = res
	return res
}
exports.findbyid = async (ctx, next) => {
	console.log('update ok')
	const id = xss(ctx.request.body.id)
	const update_str = xss(ctx.request.body.update)
	console.log(`--update_str--${update_str}--typeof update_str--${typeof update_str}`)
	const update_data = User.findByIdAndUpdate(id,{data:update_str})
	let res = []
	await update_data.exec(function(err, doc) {
		if (err) {
			console.log('err')
			res = []
		} else {
			console.log(doc)
			res = doc;
		}
	})
	ctx.body = res
	return res
}