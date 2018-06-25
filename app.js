var express = require('express')
var app = express()
var router = require('./router')
app.use(router)

app.listen(1024,() => {
	console.log(1024)
})




