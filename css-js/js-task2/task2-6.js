// 下面是获取储存的身份，转换数字为字符串
var arr = JSON.parse(sessionStorage.getItem("arr"));
var click = JSON.parse(sessionStorage.getItem("click"));
var days = JSON.parse(sessionStorage.getItem("days"));
sessionStorage.setItem("days", JSON.stringify(days));
sessionStorage.setItem("arr", JSON.stringify(arr));

// 获取三个变量，来确定进入的是哪个阶段页面
var KillSelect = JSON.parse(sessionStorage.getItem("KillSelect"));
var Vote = JSON.parse(sessionStorage.getItem("Vote"));
var Judge = JSON.parse(sessionStorage.getItem("Judge"));

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
};
btnYes[0].onclick = function() {
    // 确定就是重新隐藏而已。

    hiddenAll[0].style.display = "none";
    hiddenBox[0].style.display = "none";
};

// 获取顶部文字节点
var topText = $(".head-p");

// 首先进入法官页面，覆盖全屏，仅能看不能点击，只能点击确定按钮。
if (Judge !== 0) {
    topText.html("法官查看");
    hiddenAll[0].style.display = "block";
    hiddenAll[0].style.opacity = "0";
    $(".foot-btn").click(function() {
        location.href = "task2-5.html";
    });
}
// 如果进入投票页面
if (Vote !== 0) {
    topText.html("大家投票");
}
// 死人数组的获取
if (sessionStorage.getItem("deathMan") !== null) {
    deathMan = JSON.parse(sessionStorage.getItem("deathMan"));
} else {
    var deathMan = [];
}
console.log(click);
// 变更的数组读取，添加一个条件。
if (deathMan.length !== 0) {
    var arrChange = JSON.parse(sessionStorage.getItem("arrChange"));
    console.log(arrChange);

}

console.log(deathMan);
// 变量，记录点击该盒子是哪一个。
var thisBox;

// 根据啥判断进行修改顶部文字？如何判断进入该页面第几次？

// 下面是返回的按钮
var back = $(".head-btn");
back[0].onclick = function() {
    location.href = ".";
};

// 根据数组长度生成动态盒子。
for (var i = 0; i < arr.length; i++) {
    // 创建一个空数组，拿来装用户的自定义对象属性

    $("main").append('<button class="father"></button>');
    $(".father").eq(i).append('<div class="show-box"></div>');
    // 身份
    $(".show-box").eq(i).append('<p class="show-ID"></p>');
    // 往p里面塞身份
    $(".show-ID").eq(i).html(arr[i]["name"]);
    // 编号盒子
    $(".show-box").eq(i).append('<div class="number-box"></div>');
    // 往里塞编号
    $(".number-box")
        .eq(i)
        .html(i + 1 + "号");
    // 获取父级的dom节点
    var btnBox = document.getElementsByClassName("father");
    // 获取格子下标
    btnBox[i].index = i;
}

var btnBox = $(".father");
// 遍历读取死亡数组，使死亡数组变色
for (let i = 0; i < deathMan.length; i++) {
    $(".show-ID").eq(deathMan[i]).css("background", "red");
}

// 点击每个盒子变色
btnBox.click(function() {
    let index = $(this).index();
    thisBox = index;
    // 使每次点击，遍历数组颜色还原
    for (let i = 0; i < arr.length; i++) {
        //遍历数组
        $(".show-ID").eq(i).css("background", "#f5c97b");
    }
    // 使死亡数组处于变色
    for (let i = 0; i < deathMan.length; i++) {
        $(".show-ID").eq(deathMan[i]).css("background", "red");
    }
    // 如果点击的格子处于死亡状态，变色，点击出现提示。
    if (deathMan.length !== 0) {
        if (arrChange[thisBox]["state"] == "die") {
            hiddenAll[0].style.display = "block";
            hiddenBox[0].style.display = "flex";
            $(".hidden-box-p").html("我都死了你还想再杀我一次？");
        }
        console.log(arrChange[$(this).index()]);
    }
    // 点击时子级变色
    $(".show-ID").eq($(this).index()).css("background", "red");
    // 如果判断是杀手进入页面，不可点击杀手，不可变色，跳出弹框。且废弃该按钮。 
    if (KillSelect != 0) {
        if (arr[thisBox]["name"] == "杀手") {
            hiddenAll[0].style.display = "block";
            hiddenBox[0].style.display = "flex";
            $(".show-ID").eq(thisBox).css("background", "#f5c97b");
            $(".hidden-box-p").html("别激动，自己人");
            $(this).attr("disabled", true);
        }
    }
    //
});
// 确定按钮点击事件
console.log(KillSelect)
$(".foot-btn").click(function() {
    // 如果进入杀手页面，点击杀手，跳弹框且不跳转。
    if (KillSelect == 1) {
        if (arr[thisBox]["name"] == "杀手") {
            hiddenAll[0].style.display = "block";
            hiddenBox[0].style.display = "flex";
            $(".show-ID").eq(thisBox).css("background", "#f5c97b");
            $(".hidden-box-p").html("请选择一个杀死");
        } else {
            if (deathMan.length == 0) {
                // 第一次
                arr[thisBox]["state"] = "die";
                deathMan.push(thisBox);
                // 储存变更数组，更名以免冲突。
                sessionStorage.setItem("arrChange", JSON.stringify(arr));
                location.href = "task2-5.html";
                sessionStorage.setItem("deathMan", JSON.stringify(deathMan));
            } else {
                arrChange[thisBox]["state"] = "die";
                sessionStorage.setItem("arrChange", JSON.stringify(arrChange));


                // 把该下标存入死亡数组，方便回头继续改变颜色。
                deathMan.push(thisBox);
                location.href = "task2-5.html";
                sessionStorage.setItem("deathMan", JSON.stringify(deathMan));
            }
        }

    } else { //若没进入杀手页面，则没有限制。
        arrChange[thisBox]["state"] = "die";
        sessionStorage.setItem("arrChange", JSON.stringify(arrChange));
        deathMan.push(thisBox);
        location.href = "task2-5.html";
        sessionStorage.setItem("deathMan", JSON.stringify(deathMan));

    }
    if (deathMan.length > 0) {
        let alive = arrChange.filter(function(item) {
            return (item.state == "alive")
        });
        let killerAlive = alive.filter(function(item) {
            return (item.name == '杀手')
        });
        let manAlive = alive.filter(function(item) {
            return (item.name == '平民')
        });
        if (killerAlive.length >= manAlive.length) {
            let killWin = 0;
            killWin++
            sessionStorage.setItem("killWin", JSON.stringify(killWin));

            location.href = "task2-7.html"
                // 跳转杀手胜利页面，生成一个胜利变量，储存，让胜利页面读取，若为几则谁赢。
        } else if (killerAlive.length == 0) {
            let manWin = 0
            manWin++
            sessionStorage.setItem("manWin", JSON.stringify(manWin));


            location.href = "task2-7.html"

            // 跳转平民胜利页面
        }
        console.log(alive)
        console, log(killerAlive)
        console.log(manAlive)
    }
});