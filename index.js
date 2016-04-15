'use strict';
const electron = require('electron');
var $ = require('jquery');
const app = electron.app;

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new electron.BrowserWindow({
        width: 700
        , height: 500
        , frame: false
        , minWidth: 600
        , minHeight: 400,

    });
    var wind = win;
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', onClosed);
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});