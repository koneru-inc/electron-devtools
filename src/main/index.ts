import { BrowserWindow, app, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import * as q from 'q';

import { InitDevToolsModuleParams, LogItem } from './types';

let devToolsWindow: BrowserWindow | null;
const LOGS_STORE: LogItem[] = [];

const showDevToolsWindow = async (): Promise<void> => {
    if (devToolsWindow) {
        devToolsWindow.show();
        devToolsWindow.focus();
        return;
    }

    devToolsWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (isDev) {
        await devToolsWindow.loadURL('http://localhost:1234/dist/renderer/');
        devToolsWindow.webContents.openDevTools();
    } else {
        await devToolsWindow.loadFile('../renderer/index.html');
    }

    devToolsWindow.on('closed', () => {
        devToolsWindow = null;
    });
};

const hideDevToolsWindow = async (): Promise<void> => {
    if (!devToolsWindow) {
        return;
    }

    devToolsWindow.close();
};

const setHandlersOnWindow = async (win: BrowserWindow): Promise<void> => {
    // if (devToolsWindow && devToolsWindow.id === win.id) {
    //     return;
    // }
    console.log('patched', win.id);
};

const init = async ({ show }: InitDevToolsModuleParams): Promise<void> => {
    const deffer = q.defer();

    if (!app.isReady()) {
        app.once('ready', deffer.resolve);
        await deffer.promise;
    }

    // const string = fs.readFileSync(__dirname + '/logsProxy.js', 'utf8');

    ipcMain.on('@ELECTRON_DEVTOOLS/CONSOLE', (_, args, key) => {
        devToolsWindow.webContents.send('@ELECTRON_DEVTOOLS/CONSOLE', args, key);
        LOGS_STORE.push({
            value: args,
            type: key,
            payload: args.slice(1),
        });
        console.trace(...LOGS_STORE);
    });

    console.log(show);
    if (show || (show === undefined && process.env.NODE_ENV === 'development')) {
        await showDevToolsWindow();
    }
    // Set all handlers and init some store
    BrowserWindow.getAllWindows().forEach(setHandlersOnWindow);

    app.on('browser-window-created', (event, newWindow) => {
        setHandlersOnWindow(newWindow);
    });
};
const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (args: any[], key): void => {
        LOGS_STORE.push({
            type: key,
            value: args[0],
            payload: args.slice(1),
        });
    },
};

export default {
    showDevToolsWindow,
    init,
    hideDevToolsWindow,
    logger,
};
