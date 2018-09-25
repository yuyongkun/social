const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//body-parser
// app.use(bodyParser.json());//parse application/json
app.use(bodyParser.urlencoded({//parse application/x-www-form-urlencoded
    extended: false
}));

//使用mongoose连接mongodb
const db = require('./config/db').mongoURI;
mongoose.connect(db).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});

//passprot 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//引入users
const user = require('./router/api/users');
app.use('/api/users', user);

const port = process.env.PORT || 5000;
app.get('*', (req, res) => {
    res.send('404');
});
app.listen(port, () => {
    console.log(`server is start on ${port}`);
});