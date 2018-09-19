const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//引入数据库配置文件
const dbConfig = require('./config/db');
//connect mongoose
mongoose.connect(dbConfig.dbURL, { useNewUrlParser: true }).then(() => {
    console.log('mongodb connected...');
}).catch((err) => {
    console.log('数据库连接失败', err);
});

//load router
const users = require('./routes/users');
const ideas = require('./routes/ideas');

// body-parse middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ //parse application/x-www-form-urlencoded
    extended: false
}));

//use router
app.use('/users', users);
app.use('/ideas', ideas);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = '404';
    next(err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is started on ${port} `);
});
