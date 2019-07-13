// #/app/db/mongoose_handel.js

const {SuccessModel,ErrorModel} = require('../models/resModel')


exports.mongoose_find = async (idata) => {
	let find = idata.model.find((idata.author === 'admin') && {} || {
		"author": idata.author
	});
	console.log(`--author:${idata.author}--limit_data:${idata.limit}--page_data:${idata.page}`)
	await find //分页查询
		.skip((idata.page - 1) * idata.limit)
		.limit(parseInt(idata.limit))
		.exec(function(err, doc) { //回调函数
			if (err) {
				console.error('err')
				return new ErrorModel({
					err
				}, 'false to get list')
			} else {
				console.log(doc)
				return  new SuccessModel({
					doc
				}, 'get list ok')
			}
		})
}