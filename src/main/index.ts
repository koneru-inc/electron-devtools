import { BrowserWindow, app, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import * as q from 'q';
import consoleProxy from './logsProxy';
import { InitDevToolsModuleParams, LogItem } from './types';
import sendLogsToRenderProcess from './logServer';

let devToolsWindow: BrowserWindow | null;
const LOGS_STORE: LogItem[] = [];

const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (event, key, ...args: any[]): void => {
        if (devToolsWindow) {
            devToolsWindow.webContents.send('@ELECTRON_DEVTOOLS/CONSOLE', key, ...args);
            LOGS_STORE.push({
                type: key,
                value: args,
                payload: args.slice(1),
            });
        }
    },
};

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
    if (devToolsWindow && devToolsWindow.id === win.id) {
        return;
    }
};

const init = async ({ show }: InitDevToolsModuleParams): Promise<void> => {
    const deffer = q.defer();

    if (!app.isReady()) {
        app.once('ready', deffer.resolve);
        await deffer.promise;
    }

    ipcMain.on('@ELECTRON_DEVTOOLS/CONSOLE', logger.send);
    consoleProxy(logger);
    sendLogsToRenderProcess(LOGS_STORE);

    if (show || (show === undefined && process.env.NODE_ENV === 'development')) {
        await showDevToolsWindow();
    }
    // Set all handlers and init some store
    BrowserWindow.getAllWindows().forEach(setHandlersOnWindow);

    app.on('browser-window-created', (event, newWindow) => {
        setHandlersOnWindow(newWindow);
    });
};

export default {
    init,
    logger,
    showDevToolsWindow,
    hideDevToolsWindow,
};
