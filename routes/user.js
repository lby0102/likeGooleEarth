var express = require('express');
let User = require('../models/User');
const bcrypt = require('bcryptjs');
var router = express.Router();



router.post('/login', async (req, res, next) => {

    const { username, password } = req.body;
    User.findOne({ name: username }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    req.session.user = user;
                    res.send({message: "登录成功！" });
                }else{
                    res.status(400).send({ message: "用户名或密码不正确！" });
                }
            })
        } else {
            res.status(400).send({ message: "用户名不存在！" });
        }
    })


    // if (req.body.username == user.username && req.body.password == user.password) {
    //     req.session.user = user;
    //     console.log(req.session.user);
    //     res.send({ status: 200, message: "登录成功！" });
    // } else {
    //     req.session.error = "用户名或密码不正确！";
    //     res.status(400).send({ status: false, message: "用户名或密码不正确！" });
    // }
});
router.post('/register', function (req, res, next) {
    const { username, password } = req.body;
    User.findOne({ name: username }).then(user => {
        if (user) {
            res.status(400).send({
                message: '用户已存在！'
            })
        } else {

            const newUser = new User({
                name: username,
                password: password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.send({
                                message: '注册成功！'
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).send({
                                message: '注册失败！'
                            })
                        });
                });
            });

        }
    })
})



module.exports = router;
