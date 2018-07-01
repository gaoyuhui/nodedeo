const express = require('express');
const app = express();
const fs = require('fs');


app.listen(3000,()=>{
    console.log(3000)
})
app.get('/index', (req,res) => {
    try{
        JDON.parse('abc')
    }catch(err) {
        next(err)
    }
    
    res.send('index')
})




app.get('/index', (req,res) => {
    
})

app.use((err,req,res,next) => {
    if(err) {
        return res.send('错误')
    }
    next()
});

app.use((req,res,next) => {
    fs.readFile('./index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})


// app.get('/post',(req, res, next) => {
//     if(true) {
//         next();
//     } else {
//         res.send('验证失败')
//     }
// },(req, res) => {
//     res.send('验证成功')
// })










// app.use(static.apply('./public'));

// function static(path) {
//     return function(req, res, next) {
//         const filePath = path + req.path;
//         fs.readFile(filePath,(err, data) => {
//             if (err) {
//                 return next();
//             }
//             res.end(data);
//         })
//     }
// }