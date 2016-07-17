const {
    ipcRenderer
} = require('electron');
var jk=new Object();
$("#tr").click(function () {
    $("#men").toggle();
    $("#tran").show();
});
ipcRenderer.on("tr", (event, nome,id) => {
    $("#tra").prepend("<div class=tritem><div class=trnome><span>" + nome + "</span></div><div class=statContainer><div class=stat id='" +id+ "'></div></div></div>");
    jk[nome]=id;
});
ipcRenderer.on("trupdt", (event, tb, nom) => {
    $("#"+jk[nom]).css("width", tb*100+"%");
    console.log("update");
});
