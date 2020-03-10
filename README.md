# node爬虫
常用到的工具
## cheerio
```js
// 引入cheerio
const cheerio = require("cheerio");
// 假设html为一个网页
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="test">你好呀</div>
    <!-- <script src="./cheerio-superagent/cheerio-superagent.js"></script> -->
</body>
</html>
`;
// 创建$对象
const $ = cheerio.load(html);
// 利用选择器进行元素选择，这里假设选择div里面的文字内容
// 语法和jquery类似
// 选择出来的结果并不是真实的dom对象，是一个具有一个或多个虚拟dom对象的数组
let context = $('div#test')
// 将选择出来的虚拟dom对象转换为Jquery对象
let jDom = $(context[0]);
// 调用jquery的方法,提取div中的text
let text = jDom.text();
console.log(text)
```
## node-schedule
```js
var schedule = require("node-schedule");  

//1. 确定的时间执行
// 要注意这里的月份是从 0 - 11 分别代表 1 - 12月份
var date = new Date(2020,2,10,14,24,0);  
schedule.scheduleJob(date, function(){  
   console.log("执行任务"+date);
});

//2. 秒为单位执行 
//比如:每5秒执行一次
var rule1     = new schedule.RecurrenceRule();  
var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule1.second = 5;每分钟的第五秒执行
// 同理
// rule.minutes = 5;每小时的第5分钟执行
rule1.second  = times1;  
schedule.scheduleJob(rule1, function(){
    // console.log("执行任务");    
});

//3.以分为单位执行
//比如:每5分种执行一次
var rule2     = new schedule.RecurrenceRule();  
var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule2.minute  = times2;  
schedule.scheduleJob(rule2, function(){  
    // console.log("执行任务");    
});  

//4.以天单位执行
//比如:每天6点30分执行
var rule = new schedule.RecurrenceRule();
// 从周一到周六的六点三十分分执行，参数为数组。
// 每周的某一天执行，参数为一个数字
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 6;
rule.minute =30;
var j = schedule.scheduleJob(rule, function(){
//  　　　　console.log("执行任务");
});

// 5.取消定时执行
// j.cancel()
```


# 新型冠状病毒爬虫练习
COV为本次练习代码文件，COVData为爬取到的数据
## 接口请求地址及参数如下
`/covdata/?date=20200310`
## 请求返回结果
```js
[
    {
        // 疑似病例
        "suspectedCount": 0,
        // 累积死亡人数
        "deadCount": 3024,
        // 当前确诊人数
        "currentConfirmedCount": 16995,
        // 累积治愈人数
        "curedCount": 47741,
        // 累积确诊人数
        "confirmedCount": 67760,
        // 地理位置id
        "locationId": 420000,
        // 省份名称
        "provinceName": "湖北省",
        "provinceShortName": "湖北",
        // 评论
        "comment": "",
        // 下属城市(字段和省份一致)
        "cities": [
            {
                "suspectedCount": 0,
                "deadCount": 2404,
                "currentConfirmedCount": 15588,
                "curedCount": 31973,
                "confirmedCount": 49965,
                "locationId": 420100,
                "cityName": "武汉"
            },
            {
                "suspectedCount": 0,
                "deadCount": 126,
                "currentConfirmedCount": 281,
                "curedCount": 3111,
                "confirmedCount": 3518,
                "locationId": 420900,
                "cityName": "孝感"
            }
        ]
    }
]
```