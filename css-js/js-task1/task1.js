function colorRandom() {
  var a, b, c;
  var a = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var c = Math.round(Math.random() * 255);
  return "rgb(" + a + "," + b + "," + c + ")";
};
// 获取随机颜色为rgb标准的256阶三原色组合而成，后面转为16进制输出字符串和#符号搭配组成颜色

var box = document.getElementsByClassName("littlebox");
var btn1 = document.getElementsByClassName("btn1");
var btn2 = document.getElementsByClassName("btn2");
var time = null;
// 获取按钮dom

// 遍历盒子重置颜色
function reset() {
  for (var i = 0; i <= 8; i++) {
    box[i].style.backgroundColor = "orange";
  }
};
// 洗牌算法,声明数组，带入洗牌算法，抽取的牌和最后的交换。
var n = [0, 1, 2, 3, 4, 5, 6, 7, 8];
function shuffle(n) {
  var length = n.length;
  for (var i = length - 1; i >= 0; i--) {
    var ran = Math.floor(Math.random() * (i + 1));
    var l = n[i];
    n[i] = n[ran];
    n[ran] = l;
  }
};

// 按钮1点击事件重复
btn1[0].onclick = function threebox() {
  clearInterval(time);
  time = setInterval(function time() {
    shuffle(n);
    reset();
    box[n[8]].style.backgroundColor = colorRandom();
    box[n[7]].style.backgroundColor = colorRandom();
    box[n[6]].style.backgroundColor = colorRandom();
  }, 700);
  // 重复
};
// 问题：reset报错，
btn2[0].onclick = function stop() {
  reset();
  clearInterval(time);
};
