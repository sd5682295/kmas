// #/app/db/mongoose_handel.js

const {
	SuccessModel,
	ErrorModel
} = require('../models/resModel')


exports.mongoose_find = async (idata) => {
	let find = idata.model.find((idata.author === 'admin') && {} || {
		"author": idata.author
	});
	// console.log(`--author:${idata.author}--limit_data:${idata.limit}--page_data:${idata.page}`)
	let res_data
	await find //分页查询
		.skip((idata.page - 1) * idata.limit)
		.limit(parseInt(idata.limit))
		.exec(function(err, doc) { //回调函数
			if (err) {
				res_data = new ErrorModel({
					err
				}, 'false to get list')

			} else {
				res_data = new SuccessModel({
					doc
				}, 'get list ok')

			}
		})
	return res_data
}

exports.mongoose_add = async (idata) => {
	const add_data = new idata.model({
		data: idata.data,
		author: idata.author
	})
	let res_id
	try {
		await add_data.save()
		res_id = add_data.get("id")
		return new SuccessModel({
			res_id
		}, 'save ok')
	} catch (e) {
		return new ErrorModel({
			e
		}, 'false to save')

	}
}

exports.mongoose_del = async (idata) => {
	const remove_data = idata.model.findByIdAndRemove(idata.id, {
		author: idata.author
	})
let res_data
	await remove_data.exec(function(err, doc) { //回调函数
		if (err) {
			console.log('err')
			res_data = new ErrorModel({
				err
			}, 'false to get list')
		} else {
			console.log('doc')
			res_data = new SuccessModel({
				doc
			}, 'get list ok')
		}
	})
	return res_data
}
