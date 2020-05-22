// 下面是获取储存的身份，转换数字为字符串
var arr = JSON.parse(sessionStorage.getItem("arr"));
console.log(arr);
// 再次储存数组
sessionStorage.setItem("arr", JSON.stringify(arr));
// 这是点击次数的变量声明
var click = 0




// 下面是返回第3页的按钮
var back = $(".head-btn");
back[0].onclick = function() {
    location.href = "task2-3.html";
};
// 根据数组长度生成动态盒子。
for (let i = 0; i < arr.length; i++) {
    // 下面是参考师兄代码写的jQuery版。
    $('main').append('<button class="father"></button>')
    $('.father').eq(i).append('<div class="show-box"></div>')
        // 身份
    $('.show-box').eq(i).append('<p class="show-ID"></p>')
        // 往p里面塞身份
    $('.show-ID').eq(i).html(arr[i]['name'])
        // 编号盒子
    $(".show-box").eq(i).append('<div class="number-box"></div>')
        // 往里塞编号
    $('.number-box').eq(i).html((i + 1) + '号')
        // 开始页面不需要点击隐藏变色之类的。
        // $('.father').eq(i).append('<div class="hidden"><button class="hidden-img-knife"></button></div>')

    // // 下面是自己写的原生
    // // 获取main节点
    // var main = document.getElementById("main")
    //     // 生成div，加入classname
    // var father = document.createElement("div")
    // father.className = "father"
    // var showBox = document.createElement("div")
    // showBox.className = "show-box"
    // var showP = document.createElement("p")
    // showP.className = "show-ID"
    //     // 上格子的身份
    // var showID = document.createTextNode(arr[i])
    //     // 下格子
    // var numberBox = document.createElement("div")
    // numberBox.className = "number-box"
    //     // 下格子里的编号
    // var number = document.createTextNode((i + 1) + '号')
    //     // 开始填充
    // main.appendChild(father)
    // father.appendChild(showBox)
    // showBox.appendChild(showP)
    // showBox.appendChild(numberBox)
    // numberBox.appendChild(number)
    // showP.appendChild(showID)

    // // 下为隐藏大格子+刀
    // var hidden = document.createElement("div")
    // hidden.className = "hidden"
    // var knifr = document.createElement("button")
    // knifr.className = "hidden-img-knife"

    // // 开始填充，先把隐藏大盒子塞进父级大盒子里，把刀塞进隐藏盒子里
    // father.appendChild(hidden)
    // hidden.appendChild(knifr)


}
//获取开始游戏按钮，进入跳转天数页面，根据 点击？生成游戏第一天
var starGame = $('.foot-btn')
starGame.click(function() {
        location.href = "task2-5.html"
    })
    // 如何把被杀死的装进数组里？获取被点击刀格子的值？
    // 首先获取格子的值，然后想办法获取被点击刀使第几个盒子？