var $ = require('jquery');
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
var cont = 1;
var cont = 1;
var ind;
var len = function () {
    if ($(".tab").length <= 4) {
        var n = $("#separadores .tab").length;
        var w = (100 / n);
        $(".tab").width(w + '%');
    } else {
        var w = (100 / 4);
        $(".tab").width(w + '%');
    }
};
$('#navbar').keyup(function (e) {
    if (e.keyCode == 13) {
        var url = $("#navbar").val();
        if (!url.indexOf("title") != -1) {
            if (url.indexOf("http") == -1) {
                url = "http://" + url;
            }
        }
        $('.vista.ativa').attr('src', url);
        $('.tab.ativa').html("<a>X</a>");
    }
});
$(".addsep").click(function () {
    $(".tab.ativa").removeClass("ativa");
    $(".vista.ativa").removeClass("ativa");
    $("#separadores").append("<li class='tab ativa'><a>X</a></li>");
    $("#at").removeAttr("id");
    $("#views").append("<webview id='at' class='vista ativa' src=" + "http://google.com" + "></webview>");
    ind = $("#at").index();
    $("#at.vista.ativa").bind("dom-ready", title);
    document.getElementById("at").addEventListener("new-window", novo);
    len();
});
$("body").on("click", ".tab", function () {
    console.log("tab");
    $(".tab.ativa").removeClass("ativa");
    var index = $(this).index();
    $(".vista,.ativa").removeClass("ativa");
    $(".vista").eq(index).css("height", $("views").css("height"));
    $(".vista").eq(index).css("width", $("views").css("width"));
    $(".tab").eq(index).addClass("ativa");
    $(".vista").eq(index).addClass("ativa");

    $("#at").removeAttr("id");
    $(".vista.ativa").attr("id", "at");
    var url = document.getElementById("at").getURL();
    $("#navbar").val(url);
    title();
});
$("#ret").click(function () {
    document.getElementById("at").goBack();
});
$("body").on("click", ".tab a", function () {
    var index = $(this).parent().prevAll().length;
    $(".tab").eq(index).remove();
    $(".vista").eq(index).remove();
    len();
});
var title = function () {
    console.log("document Ready");
    var pag = document.getElementById("at").getTitle();
    var url = document.getElementById("at").getURL();
    var indr = $(".tab .ativa").index();
    $("#navbar").val(url);
    $('.tab').eq(indr).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
};
var novo = function (e) {
    $(".addsep").trigger("click");
    $('.vista.ativa').attr('src', e.url);
};
ind = $("#at").index();
document.getElementById("at").addEventListener("dom-ready", title);
document.getElementById("at").addEventListener("new-window", novo);