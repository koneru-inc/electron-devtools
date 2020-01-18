import { app, BrowserWindow } from 'electron';
import * as path from 'path';

import DevTools from '../main/index';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), './dist/testApp/logsProxy.js'), // REQUIRED IN EACH NEW BROWSER WINDOW!
        },
    });

    mainWindow.loadFile('./dist/testApp/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    DevTools.init({ show: true }); // REQUIRED!
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
