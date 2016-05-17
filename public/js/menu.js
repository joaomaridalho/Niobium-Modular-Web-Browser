var $ = require('jquery');
//menu responsivo
var o = 1;
$(".hamburguer").click(function () {
    console.log("menu");
    if (o == 1) {
        $("#menu").slideToggle("slow");
        $("#views").css("width", "-webkit-calc(100% - 200px)");
        o = 0;
    } else {
        $("#menu").toggle();
        $("#views").css("width", "100%");
        o = 1;
    }
});