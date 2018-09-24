//register & login
const express = require('express');
const router = express.Router();
const User=require('../../model/User');
router.post('/register', (req, res) => {
   User.findOne({email:req.body.email}).then((user)=>{
       if(!user){
          User.create({
              username:req.body.username,
              email:req.body.email,
              password:req.body.password
          }).then(()=>{
              res.json({
                  msg:'注册成功'
              });

          });
       }

   });
});
//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get('/test', (req, res) => {
    res.json({
        msg: '登录成功'
    });
});
module.exports = router;