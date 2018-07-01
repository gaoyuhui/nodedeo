const categoryModel = require('../modles/category');
const topicModel = require('../modles/topic')

exports.showTopic = (req,res) => {
	categoryModel.getAll((err,categories) => {
		console.log(categories)
		res.render('topic/create.html',{
			categories,
			user: req.session.user
		})
	})
}

exports.handleTopic = (req,res) => {
	if(!req.session.user) {
		res.json({
			code:403,
			msg: '登陆过期'
		})
	}
	req.body.userId = req.session.user.id;
	req.body.createdAt = new Date();
	topicModel.createTopic(req.body,(err, isOK) => {
		if(err) {
			return res.json({
				code: 500,
				msg: '服务器没部错误'
			})
		}
		if(isOK) {
			res.json({
				code: 200,
				msg: '添加成功'
			})
		}else {
			res.json({
				code: 404,
				msg: '添加失败'
			})
		}
	})
}

exports.showTopicID = (req,res) => {
	const topID = req.params.topicID
	if(isNaN(topID)) {
		res.send('参数错误')
	}
	topicModel.getById(topID, (err, topic) => {
		if(err) {
			return res.send('服务器内部错误')
		}
		if(topic){
			res.render('topic/show.html',{
				topic,
				user: req.session.user
			})
		}else {
			res.send('查询的数据不存在')
		}

	})
}

exports.showEdit = (req,res) => {
	const id = req.params.topicID;
	// console.log(id);
	if(isNaN(id)) {
		return res.send('参数错误')
    }
	topicModel.getAll((err,categories) => {
		topicModel.getById(id, (err, topic) => {
			// console.log(categories);
			// console.log(topic);
			if(err) {
				return res.send('内部错误')
			}
			if(topic) {
				res.render('topic/edit.html',{
					categories,
					topic,
					user: req.session.user
				})
			}
		})
	})
	
}
exports.handleTopicID = (req,res) => {
	const id = req.params.topicID;
	req.body.id = id
	// console.log(req.body.id);
	console.log(req.body)
	topicModel.update(req.body, (err, isOK) => {
		if(err) {
			return res.json({
				code:500,
				msg:'内部错误'
			})
		}
		if(isOK) {
			res.json({
				code:200,
				msg:'修改成功'
			})
		}else {
			res.json({
				code:400,
				msg:'修改失败'
			})
		}
	})
}
exports.hanleDelete = (req,res) => {
	const id = req.params.topicID
	topicModel.delete(id,(err,isOK)=> {
		if(err) {
			return res.send('服务器内部错误')
		}
		if(isOK) {
			res.redirect('/')
		}else {
			res.send('删除失败')
		}
	})
}