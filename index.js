'use strict';
var electron = require('electron');
var $ = require('jquery');
var app = electron.app;
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
    frame: false,
    minWidth: 300,
    minHeight: 300,
    icon: 'atom.ico',
    title: 'Niobium'
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);
  return win;
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
  var session = mainWindow.webContents.session;
  session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    item.setSavePath(app.getPath("downloads") + "\\" + item.getFilename());

    item.on('updated', (event, state) => {
      var tb = item.getReceivedBytes() / item.getTotalBytes();
      mainWindow.setProgressBar(tb);
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        mainWindow.setProgressBar(0);
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  });
});