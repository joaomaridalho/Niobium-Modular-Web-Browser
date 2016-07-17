var $ = require('jquery');
//menu responsivo
var o = 1;
$(".hamburguer").click(function () {
    console.log("menu");
    if (o == 1) {
        $("#men").slideToggle("slow");
        $("#views").css("width", "-webkit-calc(100% - 200px)");
        o = 0;
    } else {
        $("#men").hide();
        $("#views").css("width", "100%");
        $("#tran").toggle();
        o = 1;
    }
});