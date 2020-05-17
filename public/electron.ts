import { app, BrowserWindow, ipcMain } from 'electron';
import electronOauth2 from 'electron-oauth2';
import * as isDev from 'electron-is-dev';

let mainWindow: BrowserWindow;
app.allowRendererProcessReuse = true;


const oauthConfig = {
  sources: {
    repoUrl: 'https://github.com/SongJiyeon/dependency-summary'
  },
  oauth: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
    authorizationUrl: 'http://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
  }
};

const githubOAuth = electronOauth2(oauthConfig, {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }}
);

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
    mainWindow.loadURL('http://localhost:3000/');
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

ipcMain.on('github-oauth', async (event, arg) => {
  try {
    const token = await githubOAuth.getAccessToken({});
    event.sender.send('github-oauth-reply', token);
  } catch (error) {
    console.log('Error while getting token', error);
  }
});
