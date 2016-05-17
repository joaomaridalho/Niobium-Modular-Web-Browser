(function () {
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');
function init() {
document.getElementById("windowControlMinimize").addEventListener("click", function (e) {
var window = BrowserWindow.getFocusedWindow();
window.minimize();
});
document.getElementById("windowControlMaximize").addEventListener("click", function (e) {
var window = BrowserWindow.getFocusedWindow();
if (remote.getCurrentWindow().isMaximized() == true) {
window.unmaximize();
} else {
window.maximize();
}
});
document.getElementById("windowControlClose").addEventListener("click", function (e) {
var window = BrowserWindow.getFocusedWindow();
window.close();
});
};
document.onreadystatechange = function () {
if (document.readyState == "complete") {
init();
}
};
})();