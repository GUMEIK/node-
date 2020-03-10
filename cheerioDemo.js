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

