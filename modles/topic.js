
const db = require('./db_helper.js');
// 添加
exports.createTopic = (topic,callback) => {
    db.query(
        'insert into topics set ?',
        topic,
        (err, results) => {
            if(err) {
                return callback(err);
            }
            if(results.affectedRows > 0) {
                callback(null, true)
            }else {
                callback(null, false)
            }
        }
    );
};
// 查询
exports.getById = (id,callback) => {
    db.query(
        'select * from `topics` where `id`=?',
        id,
        (err, results) => {
            if(err) {
                return callback(err);
            }
            if(results.length > 0) {
                callback(null, results[0])
            }else {
                callback(null, null)
            }
        }
    );
};

// 删除
exports.delete = (id,callback) => {
    db.query(
        'delete from `topics` where `id`=?',
        id,
        (err, results) => {
            if(err) {
                return callback(err);
            }
            if(results.affectedRows > 0) {
                callback(null, true)
            }else {
                callback(null, false)
            }
        }
    );
};

// 修改
exports.update = (topic,callback) => {
    db.query(
        'update `topics` set `title`=?, `content`=?, `categoryId`=?, where id=?',
        [topic.title, topic.content, topic.categoryId, topic.id,],
        (err, results) => {
            if(err) {
                return callback(err);
            }
            if(results.affectedRows > 0) {
                callback(null, true)
            }else {
                callback(null, false)
            }
        }
    );
};

exports.getById = (callback) => {
    db.query(
        'select topics.id, nickname, title, topics.createdAt from `topics` join `users` on userId = users.id',
        (err, results) => {
            if(err) {
                return callback(err);
            }
            callback(null, results)
        }
    );
};