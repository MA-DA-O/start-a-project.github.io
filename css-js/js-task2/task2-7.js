// 获取胜利变量，获取数组，死亡数组，天数
var days = JSON.parse(sessionStorage.getItem("days"));
var arr = JSON.parse(sessionStorage.getItem("arr"));
var deathMan = JSON.parse(sessionStorage.getItem("deathMan"));
var killWin = JSON.parse(sessionStorage.getItem("killWin"));
var manWin = JSON.parse(sessionStorage.getItem("manWin"));
console.log(days);
console.log(arr);
console.log(deathMan);
console.log(killWin);
console.log(manWin);
// 获取点击按钮，隐藏的样式的dom节点
var hiddenAll = document.getElementsByClassName("hidden-all");
var hiddenBox = document.getElementsByClassName("hidden-box");
var btnNo = document.getElementsByClassName("hidden-btn-left");
var btnYes = document.getElementsByClassName("hidden-btn-right");
// 隐藏按钮的点击事件，也就是弹出提示框，恢复隐藏=确定取消
btnNo[0].onclick = function() {
    // 点击走起就跳转页面。
    hiddenAll[0].style.display = "none";
    hiddenBox[0].style.display = "none";
    location.href = "task2-1.html"
    sessionStorage.clear()
};
btnYes[0].onclick = function() {
    // 确定就是重新隐藏而已。
    hiddenAll[0].style.display = "none";
    hiddenBox[0].style.display = "none";
};
// 先获取杀手和平民人数长度就是数量
let killer = arr.filter(function(item) {
    return item.name == "杀手";
});
let mans = arr.filter(function(item) {
    return item.name == "平民";
});
$(".killer-and-man").eq(0).html('杀手' + (killer.length) + '人平民' + (mans.length) + '人')
    //根据天数生成row，生成游戏进行了 days天
for (let i = 0; i < days; i++) {
    $(".row-wrap").append('<div class="row"></div>');
    $(".row").eq(i).append('<div class="row-top"></div>');
    $(".row").eq(i).append('<div class="row-bottom"></div>');
    $(".row-top").eq(i).append('<p class="row-text-left"></p>');
    $(".row-top").eq(i).append('<p class="row-text-right">0小时07分</p>');
    $(".row-bottom").eq(i).append('<p class="row-text-bottom"></p>');
    $(".row-bottom").eq(i).append('<p class="row-text-bottom"></p>');
    $(".row-text-left").eq(i).html('第' + (i + 1) + '天')
    $(".row-text-bottom").eq(i * 2).html('晚上：' + (deathMan[i * 2] + 1) + '号被杀手杀死，' + (deathMan[i * 2] + 1) + '号是' + (arr[deathMan[i * 2]]["name"]))
    $(".row-text-bottom").eq(i * 2 + 1).html('白天：' + (deathMan[i * 2 + 1] + 1) + '号被全民投死，' + (deathMan[i + 1] + 1) + '号是' + (arr[deathMan[i * 2 + 1]]["name"]))
}
// 根据胜利变量进行分辨是哪组胜利

if (killWin == 1) {
    // 杀手胜利
    $(".winner-text").eq(0).html('杀手胜利')

}
if (manWin == 1) {
    // 平民胜利
    $(".winner-text").eq(0).html('平民胜利')
}
// 两个按钮，一个跳转主页，一个分享就不写了。
$(".footer-left").click(function() {
    hiddenAll[0].style.display = "block";
    hiddenBox[0].style.display = "flex"
})