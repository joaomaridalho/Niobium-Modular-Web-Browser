'use strict';
var $ = require('jquery');
const {
    BrowserWindow
} = require('electron').remote;
var ind;
$('#navbar').keyup(function(e) {
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
$(".addsep").click(function() {
    $(".tab.ativa").removeClass("ativa");
    $(".vista.ativa").removeClass("ativa");
    $("#at").removeAttr("id");
    $("#separadores").append("<li class='tab ativa'><a>X</a></li>");
    $("#views").append("<webview id='at' class='vista ativa' src=" + "http://google.com" + "></webview>");
    ind = $(".vista.ativa").index();
    console.log(ind);
    $("#at.vista.ativa").bind("dom-ready",{k:ind} ,function(event) {
        console.log("document Ready");
        var pag = document.getElementById("at").getTitle();
        var url = document.getElementById("at").getURL();
        $("#navbar").val(url);
        console.log(event.data.k);
        $('.tab').eq(event.data.k).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
    });
    document.getElementById("at").addEventListener("new-window", novo);});
//definições
$("#def").click(function() {
    let win = new BrowserWindow({
        width: 500,
        height: 600,
        resizable: false,

    });
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(`file://${__dirname}/views/set.html`);
    win.show();
    win.setMenu(null);
});

$("body").on("click", ".tab", function() {
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
$("#ret").click(function() {
    document.getElementById("at").goBack();
});
$("body").on("click", ".tab a", function() {
    var index = $(this).parent().prevAll().length;
    $(".tab").eq(index).remove();
    $(".vista").eq(index).remove();
});
var load = function() {
    console.log("document Ready");
    var pag = document.getElementById("at").getTitle();
    var url = document.getElementById("at").getURL();
    $("#navbar").val(url);
    console.log(event.data.inde);
    $('.tab').eq(event.data.inde).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
};
var title = function() {
    console.log("document Ready");
    var pag = document.getElementById("at").getTitle();
    var url = document.getElementById("at").getURL();
    var indr = $(".tab.ativa").index();
    $("#navbar").val(url);
    $('.tab').eq(indr).html("<img class='timg' src = 'https://plus.google.com/_/favicon?domain_url=" + url + "'>" + "<div class=out>" + pag + "</div>" + "<a>X</a>");
};
var novo = function(e) {
    $(".addsep").trigger("click");
    $('.vista.ativa').attr('src', e.url);
};
ind = $("#at").index();
document.getElementById("at").addEventListener("dom-ready", title);
document.getElementById("at").addEventListener("new-window", novo);