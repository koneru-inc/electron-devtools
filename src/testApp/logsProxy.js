process.once('loaded', () => {
    const defaultLogger = {};
    const keys = ['error', 'log', 'warn'];

    // const isRenderer = () => {
    //     // running in a web browser
    //     if (typeof process === 'undefined') {
    //         return true;
    //     }

    //     // node-integration is disabled
    //     if (!process) {
    //         return true;
    //     }

    //     // We're in node.js somehow
    //     if (!process.type) {
    //         return false;
    //     }

    //     return process.type === 'renderer';
    // };

    const jsonify = obj => {
        if (!obj) {
            return '';
        }
        try {
            return JSON.stringify(obj);
        } catch (error) {
            try {
                const seen = [];
                return JSON.stringify(obj, (key, value) => {
                    if (typeof value === 'object') {
                        if (!seen.indexOf(value)) {
                            return '__cycle__';
                        }
                        seen.push(value);
                    }
                    return value;
                });
            } catch (error) {
                return "Can' be stringified";
            }
        }
    };
    // console.log('TCL: isRenderer', isRenderer(), __dirname, require('../main/index.js'));
    // const sendToDevTools = isRenderer() ? require('electron').ipcRenderer : require('../main/index.js').logger;
    const sendToDevTools = require('electron').ipcRenderer;

    keys.forEach(key => {
        defaultLogger[key] = console[key];
        console[key] = (...args) => {
            try {
                defaultLogger[key].call(this, ...args);
                sendToDevTools.send(`@ELECTRON_DEVTOOLS/CONSOLE`, ...args, key);
            } catch (error) {
                defaultLogger.error(error);
            }
        };
    });
});

// module.exports = {};
