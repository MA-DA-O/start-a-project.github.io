$("input[type=range]").css(
  "background:#fff"
);
$("input[type=range]").mousemove(function () {
  $(this).css(
    "background",
    "linear-gradient(to right, orange 0% "  + this.value + "%)");
});
var b ;
var a = document.getElementById("a")


a.onclick=function(e){
  console.log(e)
}

