const xss = require('xss')
const mongoose = require('mongoose')
const my_schema = require('../models/schema_file')
const { SuccessModel, ErrorModel } = require('../models/resModel')

function error_handel(imsg){
	return new ErrorModel('body.table 没有赋值,必须赋值才能看到相应数据列表')
	
}

module.exports = function(itable) {
	let table = xss(itable)
	if(!table){
		return new ErrorModel('body.table 没有赋值,必须赋值才能看到相应数据列表')
	}
	if(typeof table !== 'string'){
		return new ErrorModel('body.table 数据类型错误，table数据类型应该是string')
	}
	console.log(table)
	
	return mongoose.model(table, my_schema)
}
