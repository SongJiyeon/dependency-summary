"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var mainWindow;
electron_1.app.allowRendererProcessReuse = true;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        center: true,
        width: 1300,
        height: 900,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            nativeWindowOpen: true
        }
    });
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000/');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadURL("file://" + __dirname + "/../build/index.html");
    }
    mainWindow.on('closed', function () {
        mainWindow = undefined;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
