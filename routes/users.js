const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const router = express.Router();

//引入模型
require('../models/user');
const User = mongoose.model('users');


//登录接口
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username.trim() === '') {
        res.json({
            msg:'用户名不能为空',
            status:401
        });
        return;
    }
    if (password.trim() === '') {
        res.json({
            msg:'密码不能为空',
            status:401
        });
        return;
    }
    User.findOne({ username: username }).then((user) => {
        if (user) {
            //比较密码
            bcrypt.compare(password, user.password, function(err, match) {
                if (err) throw err;
                if (match) {
                    //秘钥
                    let jwtTokenSecret='socialyu';
                    //生成token
                    let token=jwt.sign(user,jwtTokenSecret,{
                        expiresIn:3600//设置过期时间，单位是秒
                    });
                    res.json({
                        msg:'登录成功',
                        status:200,
                        userinfo:user,
                        token
                    });
                } else {
                    res.json({
                        msg:'密码错误',
                        status:401
                    });
                }
            });
        } else {
            res.json({
                msg:'登录失败',
                status:401
            });
        }
    });
});
//注册接口
router.post('/reg', (req, res) => {
    let errors = [];
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;
    if (username === '') {
        errors.push({
            text: '请输入用户名'
        });
    }
    if (email === '') {
        errors.push({
            text: '请输入邮箱'
        });
    }
    if (password === '') {
        errors.push({
            text: '请输入密码'
        });
    }
    if (repassword === '') {
        errors.push({
            text: '请再次输入密码'
        });
    }
    if (repassword.length < 4 || password.length < 4) {
        errors.push({
            text: '密码长度不能小于4'
        });
    }
    if (password !== repassword) {
        errors.push({
            text: '两次密码不一致'
        });
    }

    if (errors.length > 0) {
        res.render('users/reg', {
            errors: errors,
            username: username,
            email: email,
            password: password,
            repassword: repassword,
            title: '用户注册'
        });
    } else {

        const promise1 = new Promise((resolve, reject) => {
            User.findOne({ username: username }).then((result) => {
                if (result) {
                    req.flash('error_msg', '用户已存在！！！');
                    res.redirect('/users/reg');
                } else {
                    resolve();
                }
            });
        });

        const promise2 = new Promise((resolve, reject) => {
            User.findOne({ email: email }).then((result) => {
                if (result) {
                    req.flash('error_msg', '邮箱已存在！！！');
                    res.redirect('/users/reg');
                } else {
                    resolve();
                }
            });
        });
        Promise.all([promise1, promise2]).then(() => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                    User.create({
                        username: username,
                        email: email,
                        password: hash,
                    }).then(user => {
                        req.flash('success_msg', '注册成功！！！');
                        res.redirect('/users/login');
                    }).catch(err => {
                        req.flash('error_msg', '注册失败！！！');
                        res.redirect('/users/reg');
                    });
                });
            });
        });
    }
});
module.exports = router;