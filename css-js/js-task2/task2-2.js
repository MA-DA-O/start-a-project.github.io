// 函数没有用的时候不生效。。。就像css样式不调用不生效一样。
// 下面是返回第1页的按钮
var back = $(".head-btn");
back[0].onclick = function() {
    location.href = "task2-1.html";
};
// 获取点击按钮，隐藏的样式的dom节点
var hiddenAll = document.getElementsByClassName("hidden-all");
var hiddenBox = document.getElementsByClassName("hidden-box");
var btnNo = document.getElementsByClassName("hidden-btn-left");
var btnYes = document.getElementsByClassName("hidden-btn-right");
// 分别获取两个input的dom节点
var inputText = document.getElementById("input");
var inputRange = document.getElementById("range");
// 隐藏按钮的点击事件，也就是弹出提示框，恢复隐藏=确定取消
btnNo[0].onclick = function() {
    hiddenAll[0].style.display = "none";
    hiddenBox[0].style.display = "none";
};
btnYes[0].onclick = function() {
    hiddenAll[0].style.display = "none";
    hiddenBox[0].style.display = "none";
};
// 这个是用来赋值arr的
var array;
// 然后关联onchange，使两个数字关联。
inputText.onchange = function() {
    // 如果text的数字在规则内，则 range的值 为 text 的值，也就是text动态改变range。
    if (inputText.value > 3 && inputText.value < 19) {
        inputRange.value = inputText.value;
    }
    // 否则跳出弹框，提示输入人数不对。
    else {
        inputText.value = null;
        hiddenAll[0].style.display = "block";
        hiddenBox[0].style.display = "flex";
    }
};
// 给 text 赋值 等同range 的值
inputRange.oninput = function() {
    inputText.value = inputRange.value;
};

// 获取加减两个按钮的dom节点，然后关联加减两个按钮，增加或减少range 的值。
var reduce = document.getElementById("reduce");
var incerase = document.getElementById("increase");
// 减号设定最小减到4
reduce.onclick = function() {
    inputRange.value--;
    if (inputText.value > 4) {
        inputText.value--;
    }
};
// 加号最大加到18
incerase.onclick = function() {
    inputRange.value++;
    if (inputText.value < 18) {
        inputText.value++;
    }
};


// 这个是照搬的，没理解原理。
// 改变滑块经过后的颜色
// $("input[type=range]").css(
//   "background",
//   "linear-gradient(to right, #63A35C 0%, #ccc 50%, antiquewhite)"
// );
// 尝试改变颜色，没成功。变成hover效果。
// 根据鼠标拖动进行更改颜色，但是他的html是根据vue写的，没理解，浪费2小时。
// $("input[type=range]").mousemove(function () {
//   $(this).css(
//     "background",
//     "linear-gradient(to right, #fcc671 0%, #fcc671 "+this.value+"%, #fcc671)");
// });

// 获取点击设置的按钮dom
var btnSet = document.getElementsByClassName("set");

// 根据滑块实时的数量进行改变人数分配
btnSet[0].onclick = function aaa() {
    // 每次点击i获取滑块的数值
    var i = document.getElementById("range").value;
    // 现获取大盒子的节点,小盒子节点
    var box = document.getElementsByClassName("m-t-r-t");
    var removekill = document.getElementsByClassName("killer");
    var removeman = document.getElementsByClassName("man");
    // 点击删除之前获取的动态词组
    for (let q = removekill.length; q > 0; q--) {
        box[0].removeChild(removekill[0]);
    }
    for (let w = removeman.length; w > 0; w--) {
        box[0].removeChild(removeman[0]);
    }
    // 然后根据判断，生成动态数量的杀手平民
    // 创建一个动态数组，把数值自减1到1为止推进空数组  创建动态的杀手和平民数组，根据数值判断产生不同数量杀手。
    var killers, mans;
    if (i > 3 && i < 19) {
        // 设定杀手和平民的计算方式
        var killers, mans;
        if (i == 8) {
            killers = 1;
        } else {
            killers = Math.floor(i / 4);
        }
        mans = i - killers;
        // 设定杀手， 若大于零则自减以来产生杀死数量
        for (let a = killers; a > 0; a--) {
            var box = document.getElementsByClassName("m-t-r-t");
            var killerDiv = document.createElement("div");
            var killerText = document.createTextNode("杀 手  一人");
            var killSpan = document.createElement("span");
            // 大盒子插入div
            box[0].appendChild(killerDiv);
            // 赋予样式
            killerDiv.className = "killer";
            // div插入span和文字
            killerDiv.appendChild(killSpan);
            killerDiv.appendChild(killerText);
        }
        for (let b = mans; b > 0; b--) {
            var box = document.getElementsByClassName("m-t-r-t");
            var ManDiv = document.createElement("div");
            var manText = document.createTextNode("平 民 一人");
            var manSpan = document.createElement("span");
            box[0].appendChild(ManDiv);
            ManDiv.className = "man";
            ManDiv.appendChild(manSpan);
            ManDiv.appendChild(manText);
        }
    }

    // 空数组装杀手平民用
    var arr = [];
    // 获取滑块值
    var i = document.getElementById("range").value;
    var killers;
    if (i > 3 && i < 19) {
        if (i == 8) {
            killers = 1;
        } else {
            killers = Math.floor(i / 4);
        }

        for (let a = killers; a > 0; a--) {
            arr.push("杀手")
        }
        for (let b = i - killers; b > 0; b--) {
            arr.push("平民")
        }

    }

    // 打乱数组 洗牌算法
    function shuffle() {
        // 数组长度
        var length = arr.length;
        //   洗牌
        for (var i = length - 1; i > 0; i--) {
            var random = Math.round(Math.random() * i);
            // 最后一个数值（用于交换）
            var l = arr[i];
            // 最后和随机数交换
            arr[i] = arr[random];
            // 随机数交换最后
            arr[random] = l;
        }
    }
    // 使用算法打乱数组排列
    shuffle();



    // 转化数组为对象数组
    var playerObj = [];
    // 赋予数组元素名称，编号，存活状态
    for (let i = 0; i < arr.length; i++) {
        playerObj.push({
            name: arr[i],
            state: "alive",
            number: i,
        })
    };
    sessionStorage.setItem("arr", JSON.stringify(playerObj));
    console.log(playerObj);
    asa = arr
};
// 随便起个变量名引出arr
var asa;


// 获取dom节点按钮发牌
var btnDeal = document.getElementById("deal");
// 发牌按钮点击时，触发前往下一页
btnDeal.onclick = function inputValue() {

    if (asa == undefined) {
        hiddenAll[0].style.display = "block";
        hiddenBox[0].style.display = "flex";
    } else {
        // 跳转到下一页
        location.href = "task2-3.html";
    }
};