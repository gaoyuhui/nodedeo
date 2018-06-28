const db = require('./db_helper.js');
const md5 = require('md5');
 

// 登录
exports.showSignin = (req,res) => {

	res.render('signin.html')
};
exports.handleSignin = (req,res) => {
	var body = req.body
	// console.log(body.email)
	var sql = `select * from users where email='${body.email}'`
	// console.log(sql)
	db.query(sql,function(error,results,fields) {
		// console.log(results[0].password)
		if(error){
			return res.send('服务器没部错误');
		}
		if (results.length <= 0) {
			console.log(401);
			return res.json({
				code: 401,
				msg: '邮箱地址不存在'
			})
		}
		if(results[0].password !== md5(body.password)) {
			console.log(402);
			return res.json({
				code: 402,
				msg: '密码错误'
			})
		}
		console.log(11);
		res.json({
			code: 200,
			msg: '登陆成功'
		})
	});
			// res.render('signin.html')

};
// 注册
exports.showSignup = (req,res) => {

	res.render('signup.html')
};
exports.handleSignup = (req,res) => {

db.query(
		'select * from users where email=?',
		req.body.email,
		(err,results) => {
			if(err){return err};
			if(results.length > 0) {
				res.render('signup.html',{
					msg: '邮箱已存在'
				});
			return;
			}
			db.query(
				'select * from users where nickname=?',
				req.body.nickname,
				(err,results) => {
					if(results.length > 0) {
						res.render('signup.html',{
							msg: '昵称已存在'
						});
					return;
					}
						req.body.createdAt = new Date();
						req.body.password = md5(req.body.password);
						db.query('insert into users set ?',
						req.body, 
						(error, results, fields) => {
					 		if (error) {
					 			console.log(error);
					 			return res.send('服务器内部错误');
					 		}
					 		if(results.affectedRows === 1) {
					 			res.redirect('/signin');
					 		}else {
					 			res.render('signup.html', {
					 				msg: '注册失败'
					 			})
					 		}
					 		// console.log(results)
						});
						// res.render("signup.html")
					


				}
				);
		}
	);

}

	

exports.handleSignout = (req,res) => {
	res.send("handleSignout")
};


