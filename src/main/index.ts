import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:1234');
    } else {
        mainWindow.loadFile('../renderer/index.html');
    }
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
