// 新型冠状病毒爬虫练习
// 数据爬取来源为丁香园（https://3g.dxy.cn/newh5/view/pneumonia）
const axios = require("axios");
const cheerio = require('cheerio');
const schedule = require('node-schedule')
const path = require('path')
const fs = require('fs')
// 日期格式化处理函数
function formatNumber(num) {
    num = parseInt(num)
    if (num > 0 && num < 10) {
        num = `0${num}`;
    }
    return num;
}
async function getTargetHtml(){
    let promiseData = await axios.get("https://3g.dxy.cn/newh5/view/pneumonia");
    return promiseData.data;
}
async function dealTargetHtml(data){
    // 得到目标html文件
    let targetData = await data; 
    // 写入html文件查看内容
    // fs.writeFile('./test.html',targetData,function(err){
    //     if(!err){
    //         console.log("文件写入成功")
    //     }
    // })
    // console.log(targetData)
    let regStart = "try { window.getAreaStat = ";
    let regEnd = "}catch(e){}";
    const $ = cheerio.load(targetData);
    let item = $('script#getAreaStat');
    let dataString = item[0].children[0].data;
    let temp = dataString.replace(regStart,'')
    // 获取到JSON数据
    let dataJson = temp.replace(regEnd,'').trim();
    let oDate = new Date();
    let years = oDate.getFullYear();
    let month = formatNumber(oDate.getMonth() + 1);
    let day = formatNumber(oDate.getDate());
    
    let fileName = `${years}${month}${day}`;
    let pathName = path.resolve(__dirname,'..');
    fs.writeFile(`${pathName}/COVData/${fileName}.json`,dataJson,function(err){
        if(!err){
            console.log("json文件写入成功")
        }
    })
}
// 每隔1小时执行一次
let rules = new schedule.RecurrenceRule();
// 每小时45分执行
rules.minute = 45
console.log("开始等待执行")
schedule.scheduleJob(rules,function(){
    console.log("程序已执行",new Date().getMinutes())
    dealTargetHtml(getTargetHtml());
})
// dealTargetHtml(getTargetHtml());
// // 执行时的js文件所在的目录
// console.log(__dirname)
// // 执行时的js文件的完整路径
// console.log(__filename)
// let temp = path.resolve(__dirname,'..');
// console.log(temp)