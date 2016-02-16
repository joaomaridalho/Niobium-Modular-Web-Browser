var $ = require('jquery');
$('#navbar').keyup(function (e) {
    if (e.keyCode == 13) {
        var url = $("#navbar").val();
        if (!url.indexOf("title") != -1) {
            url = "http://" + url;
        }
        $('.vista.ativa').attr('src', url);
        $('.tab.ativa').html(url + "<a>X</a>");
    }
});
$(".addsep").click(function () {
    $(".tab,.ativa").removeClass("ativa");
    $(".vista,.ativa").removeClass("ativa");
    $("#separadores").append("<li class='tab ativa'>Youtube<a>X</a></li>");
    $("#views").append("<webview class='vista ativa' src=" + "http://youtube.com" + "></webview>");

    var n = $("#separadores .tab").length;
    var w = (100 / n) - 3;
    $(".tab").width(w + '%');
});
$("body").on("click", ".tab", function () {
    $(".tab,.ativa").removeClass("ativa");
    var index = $(this).index();
    $(".vista,.ativa").removeClass("ativa");
    $(".tab").eq(index).addClass("ativa");
    $(".vista").eq(index).addClass("ativa");


});
$("body").on("click", ".tab a", function () {
    var index = $(this).parent().prevAll().length;
    $(".tab").eq(index).remove();
    $(".vista").eq(index).remove();
    var n = $("#separadores .tab").length;
    var w = (100 / n) - 3;
    $(".tab").width(w + '%');
});
