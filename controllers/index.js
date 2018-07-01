// const db = require('../modles/db_helper.js');
const topicsModel = require('../modles/topic');
// const momment = require('momment');
exports.showIndex = (req,res) => {
	
	topicsModel.getAll(function(err, topics) {
		if(err) {
			return res.send('服务器内部错误')
		}
		res.render('index.html',{
			user: req.session.user,
			topics,
			// momment
		});
	})
	


}