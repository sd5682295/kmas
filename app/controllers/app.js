'use strict'

const xss = require('xss')
const mongoose = require('mongoose')
const {
	SuccessModel,
	ErrorModel
} = require('../models/resModel')
const model_handel = require('../db/model_handel')
const {
	mongoose_find,
	mongoose_add,
	mongoose_del
} = require('../db/mongoose_handel')

// var uuid = require('uuid')
// var userHelper = require('../dbhelper/userHelper')
// import userHelper from '../dbhelper/userHelper'


exports.list = async (ctx) => {
	const request = ctx.request
	const query = request.query
	console.log(`list ok1`)
	const author = xss(query.author)
	if (!author) {
		ctx.body = new ErrorModel('body.author 没有赋值,必须赋值才能看到相应数据列表')
		return false
	}
	if (typeof author !== 'string') {
		ctx.body = new ErrorModel(`body.author 的数据类型应该是string,实际数据类型是${typeof author}`)
		return false
	}

	const my_model = model_handel(query.table)
	if (my_model.code === -1) {
		ctx.body = my_model
		return false
	}

	const limit_data = query.limit || 20 //limit_data赋值，默认为20
	const page_data = query.page || 1 //page_data赋值，默认为1    


	const res_data = await mongoose_find({
		author,
		page: page_data,
		limit: limit_data,
		model: my_model
	})
	// console.log(res_data)
	ctx.body = res_data
	return
}
exports.add = async (ctx, next) => {
	const request = ctx.request
	const query = request.query
	let data = xss(ctx.request.body.data)
	// data = JSON.parse(data)
	if (data === '') {
		data = []
	} else if (typeof data === 'string' && data[0] !== '[') {
		data = [{
				data: data
			}],
			console.log(`--data:${data}--typeof data:${typeof data}`)
	} else {
		data = JSON.parse(data)
	}
	const author = xss(query.author)
	if (!author) {
		ctx.body = new ErrorModel('body.author 没有赋值,必须赋值才能看到相应数据列表')
		return false
	}
	if (typeof author !== 'string') {
		ctx.body = new ErrorModel(`body.author 的数据类型应该是string,实际数据类型是${typeof author}`)
		return false
	}
	const my_model = model_handel(query.table)
	if (my_model.code === -1) {
		ctx.body = my_model
		return false
	}

	const res_data = await mongoose_add({
		author,
		data,
		model: my_model
	})
	ctx.body = res_data
	return
}
//--------------------------------------------------
exports.del = async (ctx, next) => {
	const request = ctx.request
	const query = request.query
	console.log('del ok')
	const id = xss(query.id)
	if (!id) {
		ctx.body = new ErrorModel('id 没有赋值,必须赋值才能看到相应数据列表')
		return false
	}
	if (typeof id !== 'string') {
		ctx.body = new ErrorModel(`id 的数据类型应该是string,实际数据类型是${typeof author}`)
		return false
	}
	const author = xss(query.author)
	if (!author) {
		ctx.body = new ErrorModel('body.author 没有赋值,必须赋值才能看到相应数据列表')
		return false
	}
	if (typeof author !== 'string') {
		ctx.body = new ErrorModel(`body.author 的数据类型应该是string,实际数据类型是${typeof author}`)
		return false
	}
	const my_model = model_handel(query.table)
	if (my_model.code === -1) {
		ctx.body = my_model
		return false
	}
	const res_data = await mongoose_del({id,author,model:my_model})
	ctx.body = res_data
	return
	
	
	// const remove_data = my_model.findByIdAndRemove(id, {
	// 	author: author
	// })
	// let res = []
	// await remove_data.exec(function(err, doc) { //回调函数
	// 	if (err) {
	// 		ctx.body = new ErrorModel({
	// 			err
	// 		}, 'false to get list')
	// 	} else {
	// 		ctx.body = new SuccessModel({
	// 			doc
	// 		}, 'get list ok')
	// 	}
	// })
}
//---------------------------------------------------------------------------------------------------------
// exports.update = async (ctx, next) => {
// 	console.log('开始update')
// 	const id = xss(ctx.request.body.id)
// 	console.log(`--ctx.request.body.id:${ctx.request.body.id}--ctx.request.body.data:${ctx.request.body.data}`)
// 	const update_str = JSON.parse(xss(ctx.request.body.data))
// 	console.log(`--update_str--${update_str}--typeof update_str--${typeof update_str}`)
// 	const update_data = User.findByIdAndUpdate(id,{data:update_str})
// 	let res = []
// 	await update_data.exec(function(err, doc) {
// 		if (err) {
// 			console.log('err')
// 			res = []
// 		} else {
// 			console.log(doc)
// 			res = doc;
// 		}
// 	})
// 	ctx.body = res
// 	return res
// }
// exports.findbyid = async (ctx, next) => {
// 	console.log('update ok')
// 	const id = xss(ctx.request.body.id)
// 	const update_str = xss(ctx.request.body.update)
// 	console.log(`--update_str--${update_str}--typeof update_str--${typeof update_str}`)
// 	const update_data = User.findByIdAndUpdate(id,{data:update_str})
// 	let res = []
// 	await update_data.exec(function(err, doc) {
// 		if (err) {
// 			console.log('err')
// 			res = []
// 		} else {
// 			console.log(doc)
// 			res = doc;
// 		}
// 	})
// 	ctx.body = res
// 	return res
// }
