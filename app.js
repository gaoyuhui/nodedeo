var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')
var art = require('art-template')
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




