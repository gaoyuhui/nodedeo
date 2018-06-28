const db = require('./db_helper.js');
exports.showIndex = (req,res) => {
	var sql = 'select * from topics'
	db.query(sql, function (error, results, fields) {
		// console.log(results[0]);
  		if (error) throw error;
	res.render('index.html',{
		topics: results
	})
});

}