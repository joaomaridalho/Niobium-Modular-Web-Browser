var $ = require('jquery');
$('#navbar').keyup(function (e) {
    if (e.keyCode == 13) {
        var url = $("#navbar").val();
        if (!url.indexOf("title") != -1) {
            url = "http://" + url;
        }
        $('.vista.ativa').attr('src', url);
        $('.tab.ativa').html("<a>X</a>");
    }
});

$(".addsep").click(function () {
    $(".tab,.ativa").removeClass("ativa");
    $(".vista,.ativa").removeClass("ativa");
    $("#separadores").append("<li class='tab ativa'><a>X</a></li>");
    $("#views").append("<webview class='vista ativa' src=" + "http://google.com" + "></webview>");
    $("#at").removeAttr("id");
    $(".vista.ativa").attr("id", "at");
    var n = $("#separadores .tab").length;
    var w = (100 / n) - 3;
    $(".tab").width(w + '%');
    $("#at.vista.ativa").bind("dom-ready", title);
    $("#at.vista.ativa").bind("new-window", novo);
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
var title = function () {
    console.log("ola");
    var pag = document.getElementById("at").getTitle();
    var url = document.getElementById("at").getURL();
    var o = $("#at").index();
    $('.tab').eq(o).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
};
var novo = function (e) {
    $(".addsep").trigger("click");
    $('.vista.ativa').attr('src', e.url);
}

$("#at.vista.ativa").bind("dom-ready", title);
document.getElementById("at").addEventListener("new-window", novo);