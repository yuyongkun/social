const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//引入模型
require('../models/idea');
const Idea = mongoose.model('ideas');

require('../models/user');
const User = mongoose.model('users');

//编辑课程页面
router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        if (idea.userid === req.session.user._id) {
            res.render('ideas/edit', {
                title: '编辑课程',
                idea: idea
            });
        } else {
            req.flash('error_msg', '非法操作~');
            res.redirect('/ideas');
        }

    });

});

//添加课程页面
router.get('/add', (req, res) => {
    res.render('ideas/add', {
        title: '添加课程',
    });
});

//课程详情页面
router.get('/detail/:id', (req, res) => {
    let author;
    let id = req.params.id;
    let stripData;
    Idea.findOne({ _id: id }).then(data => {
        let idea=data;
        let promise1 = User.findOne({ _id: data.userid }).then(user => {
            idea.author = user.username;
        });
        let promise2=stripSearch({
            nosql:Idea,
            query:{ id:id },
        }).then((result)=>{
            stripData={
                nextStrip: result.nextStrip,
                preStrip: result.preStrip,
                firstStrip: result.firstStrip,
                lastStrip: result.lastStrip,
            }
        });
        Promise.all([promise1,promise2]).then(()=>{
            res.render('ideas/detail', Object.assign(stripData,{
                path:'/ideas/detail',
                title: idea.ctitle,
                idea
            }));
        });
    });
});

//课程列表页面
router.get('/', (req, res) => {
    Idea.find({}).then((result)=>{
        console.log(result);
        res.json({
            dataList: result
        });
    });
});

//添加课程接口
router.post('/', (req, res) => {
    let errors = [];
    const ctitle = req.body.title.trim();
    const details = req.body.details.trim();
    if (ctitle === '') {
        errors.push({
            text: '请输入标题'
        });
    }
    if (details === '') {
        errors.push({
            text: '请输入详情'
        });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: '添加课程',
            details: details
        });
    } else {
        const newCourse = {
            ctitle: ctitle,
            details: details,
            userid: req.session.user._id
        };
        Idea.create(newCourse).then(idea => {
            req.flash('success_msg', '数据添加成功！！！');
            res.redirect('/ideas');
        }).catch(err => {
            console.log(err);
        });
    }

});

//编辑课程接口
router.put('/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id }).then((idea) => {
        idea.ctitle = req.body.ctitle.trim();
        idea.details = req.body.details.trim();
        idea.save().then(() => {
            req.flash('success_msg', '数据编辑成功！！！');
            res.redirect('/ideas');
        });
    });
});

//删除课程接口
router.delete('/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(() => {
        req.flash('success_msg', '数据删除成功！！！');
        res.redirect('/ideas');
    });
});

module.exports = router;