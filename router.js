
var express = require('express')
var router = express.Router()

var user = require('./controllers/user.js');
var topic = require('./controllers/topic.js')
var index = require('./controllers/index.js')


router.get('/',index.showIndex)

router
.get('/signin',user.showSignin)
.post('/signin',user.handleSignin)
.get('/signup',user.showSignup)
.post('/signup',user.handleSignup)
.post('/signout',user.handleSignout)


router
.get('/topic/create',topic.showTopic)
.post('/topic/create',topic.handleTopic)
.get('/topic/:topicID',topic.showTopicID)
.get('/topic/:topicID/edit',topic.showEdit)
.post('/topic/:topicID/edit',topic.handleTopicID)
.post('/topic/:topicID/edit',topic.hanleDelete)

module.exports = router
