// 点击获取value值
$(".btn").eq(0).click(function() {
    var name = $(".name").get(0).value
    var pass = $(".password").eq(0).val()
    console.log(name)
    console.log(pass)
})