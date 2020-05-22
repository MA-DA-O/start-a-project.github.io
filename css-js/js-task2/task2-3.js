// 下面是返回第二页的按钮
var back = $(".head-btn");
back[0].onclick = function() {
    location.href = "task2-2.html";
};
// 下面是获取储存的数组
let data = sessionStorage.getItem("arr");
// 转换数组为字符串
var arr = JSON.parse(data);
console.log(arr);

var a = 0;
var num = $(".main-roundness");
// 默认的圆圈里的1.
let x = 1;
let q = 0;
// 下面是圆球中间的数组 设定
num[0].innerHTML = x;
// 这是点击按钮dom节点
var footBtn = $(".foot-btn-p");
// 这是点击按钮的文字默认
footBtn[0].innerHTML = "查看" + x + "号身份";
// 这是身份解密文字dom节点
var identity = $(".kill-man-p");
$(".foot-btn").click(function() {
    // a是点击按钮次数，初始0，点击加一
    a = a + 1;
    //   console.log(a);
    //   判断奇偶
    if (a % 2 == 0) {
        //偶数自增变量，给顶部圆球的
        x = x + 1;
        // console.log(x);
        // 这个是圆形顶部的数字偶数自增
        num[0].innerHTML = x;
        // 设定条件圆球不超过数组长度
        if (x > arr.length) {
            num[0].innerHTML = x - 1
        }
        // 这是图片偶数翻牌显示，奇数杀手显示。
        $(".killer").css("display", "none");
        $(".draw").css("display", "block");
        // 按钮文字变化
        footBtn[0].innerHTML = "查看" + x + "号身份";
        identity[0].innerHTML = "";
    } else {
        //   图片翻转
        $(".killer").css("display", "block");
        $(".draw").css("display", "none");
        // 文字翻转
        footBtn[0].innerHTML = "隐藏并传递给" + (x + 1) + "号";
        // 这是数组遇到奇数自增
        identity[0].innerHTML = arr[q]['name'];
        // 奇数自增变量
        q = q + 1;
        // console.log(q);

    }
    //   点击次数关联数组长度，转换为法官查看按钮，后面师兄提醒换为奇数自增的q关联。
    if (q == arr.length) {
        footBtn[0].innerHTML = "法官查看";

    }
    //   转换为法官查看后，偶数自增变量大于数组长度，跳转
    if (x > arr.length) {
        location.href = "task2-4.html";

    }
});
sessionStorage.setItem("arr", JSON.stringify(arr));