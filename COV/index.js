require('./getDataFile');
const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require("fs");
const url = require('url');
const app = new express();
const head = {
    // 都允许谁跨域
    "Access-Control-Allow-Origin": "*",
    // 允许跨域的方法
    "Access-Control-Allow-Methods": 'POST,GET',
    "Access-Control-Allow-Headers": "x-requested-with,content-type",
    // 设置编码格式
    "Content-Type": "text/plain; charset=UTF-8"
}
app.listen(2000, () => {
    console.log("服务器已启动，端口为2000")
});

let pathName = path.resolve(__dirname, '..');

app.get('/covdata', function (req, res) {
    console.log(req.url)
    let params = url.parse(req.url, true).query;
    if (params.date) {
        let date = params.date;
        try {
            // 同步读取文件
            let data = fs.readFileSync(`${pathName}/COVData/${date}.json`);
            let dataString = data.toString();
            res.set(head);
            res.send(dataString)
        } catch (e) {
            res.send(e.toString());
        }
    } else {
        res.set(head);
        res.send("输入的日期格式不正确或不存在，请重新输入！")
    }
})