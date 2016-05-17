var $ = require('jquery');
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
var windowManager = remote.require('electron-window-manager');
/*function updateWebviews() {
    var webview = document.querySelector("webview");
    webview.style.height = document.documentElement.clientHeight + "px";
    webview.style.width = document.documentElement.clientWidth + "px";
};

onload = updateWebviews;
window.onresize = updateWebviews;*/
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
    $("#at.vista.ativa").bind("dom-ready", title);
    document.getElementById("at").addEventListener("new-window", novo);
    var n = $("#separadores .tab").length;
    var w = (100 / n) - 3;
    $(".tab").width(w + '%');

});
$("body").on("click", ".tab", function () {
    $(".tab.ativa").removeClass("ativa");
    var index = $(this).index();
    $(".vista,.ativa").removeClass("ativa");
    $(".vista").eq(index).css("height", $("views").css("height"));
    $(".vista").eq(index).css("width", $("views").css("width"));
    $(".tab").eq(index).addClass("ativa");
    $(".vista").eq(index).addClass("ativa");
    $("#at").removeAttr("id");
    $(".vista.ativa").attr("id", "at");
});
$("#ret").click(function () {
    document.getElementById("at").goBack();
});
$("body").on("click", ".tab a", function () {
    var index = $(this).parent().prevAll().length;
    $(".tab").eq(index).remove();
    $(".vista").eq(index).remove();
    var n = $("#separadores .tab").length;
    var w = (100 / n) - 3;
    $(".tab").width(w + '%');
});
//definições click
$("#def").click(function () {
    console.log("def");
    var win2 = windowManager.createNew('win2', 'Windows #2');
    win2.loadURL('../views/set.html');
    win2.open();
});
var title = function () {
    console.log("dom-ready");
    var pag = document.getElementById("at").getTitle();
    var url = document.getElementById("at").getURL();
    var o = $("this").index();
    $("#navbar").val(url);
    $('.tab').eq(o).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
};
var novo = function (e) {
    $(".addsep").trigger("click");
    $('.vista.ativa').attr('src', e.url);
}
var po = $("#at").index();
$("#at.vista.ativa").bind("dom-ready", title);
document.getElementById("at").addEventListener("new-window", novo);