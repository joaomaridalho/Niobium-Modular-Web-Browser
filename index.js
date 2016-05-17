'use strict';
var electron = require('electron');
var $ = require('jquery');
var app = electron.app;
var windowManager = require('electron-window-manager');
// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
//require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new electron.BrowserWindow({
        frame: false
        , minWidth: 300
        , minHeight: 300
        , icon:'atom.ico'
        , title:'Niobium'
        , 
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