var mongoose = require('mongoose')
	,Schema = mongoose.Schema;
var personSchema = new Schema({
	name : {type:String,required:true},
	address: {type:String,required:true},
	points: {type:String,required:true},
});

var person = mongoose.model('persons',personSchema);
module.exports = {Person:person};