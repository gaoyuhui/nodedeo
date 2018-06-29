var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')
var art = require('art-template')

const session = require('express-session')
// var MySQLStore = require('express-mysql-session')(session);
// var options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'root',
//   database: 'ithub'
// };

// var sessionStore = new MySQLStore(options);

// app.use(session({
//   key: 'session',
//   secret: 'keyboard cat',     //对session进行加密
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: true
// }));



app.use(session({
  secret: 'keyboard cat', // 加密规则私钥，用来保证不同的丰巢快递柜的密码规则都是不一样的，
  resave: false,
  saveUninitialized: true // 是否在初始化的时候就给客户端发送一个 Cookie
}))

// 开放权限
app.use('/public',express.static('./public'))
app.use('/node_modules',express.static('./node_modules'))
// app.use(express.static('./views'))

app.engine('html',require('express-art-template'))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(router)

app.listen(1024,() => {
	console.log(1024)
})




