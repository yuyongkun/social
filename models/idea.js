const mongoose = require('mongoose');
const IdeaSchema=new mongoose.Schema({
	ctitle:{
		type:String,
		required:true
	},
	details:{
		type:String,
		required:true
	},
	userid:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now
	}
});
mongoose.model('ideas',IdeaSchema);

