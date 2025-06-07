const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const db = require (' ./database');
const bcrypt = require ('bcryptjs');
const {json} = require("express");
const saltRounds = 10;

const app = express();
const PORT = 3000;

//中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

//登录路由
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await db.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: '用户不存在' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ message: '登陆成功' , user: {id: user.id,username: user.username} });
        } else {
            res.status(401).json({ error: '密码错误' });
        }
    } catch (err) {
        res.status(500).json({ error: '服务器错误' });
    }
});

// 注册路由
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;


})