import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';

let mainWindow: BrowserWindow;
app.allowRendererProcessReuse = true;

function createWindow() {
  mainWindow = new BrowserWindow({
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
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${__dirname}/../build/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined!;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
