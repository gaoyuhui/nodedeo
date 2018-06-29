// const db = require('./db_helper.js');
const md5 = require('md5');
const userModel = require('../modles/user.js');

// 登录
exports.showSignin = (req,res) => {

	res.render('signin.html')
};
exports.handleSignin = (req,res) => {
	userModel.getByEmail(req.body.email, (err, user) => {
		if(err){return res.send('内部错误')}
		if(!user){return res.json({
			code: 401,
			msg: '邮箱不存在'
		})}
		const password = md5(req.body.password);
		if(password === user.password) {
			delete user.password
			req.session.user = user
			res.json({
				code: 200,
				msg: '登录成功'
			})
		}else {
			res.json({
				code: 404,
				msg: '密码错误'
			})
		}
	})

};
// 注册
exports.showSignup = (req,res) => {

	res.render('signup.html')
};
exports.handleSignup = (req,res) => {
	userModel.getByEmail(req.body.email, (err, user) => {
		if(err){
			return res.send('内部错误')
		}
		if(user) {
			return res.render('signup.html', {
				msg: '邮箱已存在'
			})
		}
	})
	userModel.getByNickname(req.body.nickname, (err, user) => {
		if(err){
			return res.send('内部错误')
		}
		if(user) {
			return res.render('signup.html', {
				msg: '昵称已存在'
			})
		}
	})
	req.body.createdAt = new Date();
	req.body.password = md5(req.body.password);
	userModel.createUser(req.body, (err, isOK) => {
		if(isOK){
			res.redirect('/signin')
		}else {
			res.render('signup.html', {
				msg: '注册失败'
			})
		}
	})
}

// 退出
exports.handleSignout = (req,res) => {
	// delete req.session.user
	req.session.destroy();
	res.redirect("/signin");
};


