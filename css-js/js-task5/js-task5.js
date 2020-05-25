// // 点击获取value值
// $(".btn").eq(0).click(function() {
//     var name = $(".name").get(0).value; //先获得dom就可以使用value
//     var pass = $(".password").eq(0).val(); //jQuery方法获得
//     console.log(name);
//     console.log(pass);
//     if (name == "" || pass == "") {
//         alert("请输入账号密码");
//     }
//     // 创建一个新的xhr实例
//     var xhr = new XMLHttpRequest();
//     //使用open方法，该实例向网站发起请求，规定请求的类型、URL（拦截名） 以及是否异步处理请求。
//     xhr.open("post", "/carrots-admin-ajax/a/login", true);
//     // 发送一个http头文件，也就是head头告诉服务器客户端要下载什么信息以及相关的参数，不写就是默认，以下就是默认的
//     xhr.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
//     // 发送数据到服务器，其中name和pwd是接口规定好的字段
//     xhr.send("name=" + name + "&pwd=" + pass);
//     console.log(xhr);
//     // 监听事件：若产生变化则指定回调函数
//     xhr.onreadystatechange = function() {
//         //判断是否发送成功和判断服务端是否响应成功4代表请求最后一步，200代表请求成功
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             //转换字符串为对象，responseText就是获得字符串形式的响应数据。
//             var jsons = JSON.parse(xhr.responseText);
//             console.log(jsons);
//             // 若是返回正确的编号则跳转，否则提示账户或密码错误的弹框，可以使用message来动态定义错误文字。
//             // if (xhr.code == 0) {
//             //     // 跳转
//             // }
//         }
//     };

// });

$(".btn").eq(0).click(function() {
    var request = $.ajax({
        // 数据方法
        type: "post",
        // 地址
        url: "/carrots-admin-ajax/a/login",
        // 数据
        data: {
            name: $(".name").get(0).value,
            pwd: $(".password").eq(0).val(),
        },
        // 返回数据类型
        dataType: "json",
        // 自动判断是否成功发送和请求成功
        // 返回成功后的回调函数，responseText，由服务器返回，并根据dataType参数进行处理后的数据；描述状态的字符串。
        success: function(response) {
            console.log(response)
            if (response.code === 0) {
                alert('正确')
                location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard"
            } else {
                alert('错误')
            }
        }
    });
})