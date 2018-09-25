//register & login
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const passport = require('passport');

require('../../model/User');
const User = mongoose.model('users');
const authen = passport.authenticate('jwt', { session: false });
/* 
$route POST api/users/register
@desc 注册接口
@access Public
*/
router.post('/register', (req, res) => {
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((user) => {
        if (!user) {
            //密码加密
            bcrypt.genSalt(10, function (err, salt) {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) throw err;
                    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                    User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        avatar
                    }).then((user) => {
                        res.status(200).json(user);
                    });
                })

            });

        } else {
            const obj={};
            obj.msg = '用户名已存在';
            if (user.email === req.body.email) {
                obj.msg = '邮箱已存在';
            }
            res.status(400).json(obj);
        }

    });
});
/* 
$route POST api/users/login
@desc 登录接口
@access Public
*/
router.post('/login', (req, res) => {
    //先判断用户是否存在
    User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            //判断密码是否正确
            bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (err) throw err;
                if (match) {
                    const secret = require('../../config/db').secretOrKey;
                    jwt.sign({ id: user.id, username: user.username }, secret, {
                        expiresIn: 3600//设置过期时间，单位是秒
                    }, (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            username: user.username,
                            token: 'Bearer ' + token
                        });
                    });

                } else {
                    res.status(400).json({
                        msg: '密码错误'
                    });
                }
            });
        } else {
            res.status(400).json({
                msg: '用户名不存在'
            });
        }

    });
});
/* 
$route GET api/users/current
@desc 获取当前用户信息
@accsss Private
*/
router.get('/current', authen, (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    });
});
module.exports = router;