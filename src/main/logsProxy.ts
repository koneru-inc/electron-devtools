type DefaultLogger = {
    [P in keyof Console]?: Console[P];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const consoleProxy = (
    { send }: { send: (event, key, args: any[]) => void } = require('electron').ipcRenderer,
): void => {
    const defaultLogger: DefaultLogger = {};
    const keys = ['log', 'error', 'warn', 'trace', 'table'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonify = (obj: any): string => {
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

    keys.forEach(key => {
        defaultLogger[key] = console[key];
        console[key] = (...args): void => {
            try {
                defaultLogger[key].call(this, args);
                send(
                    `@ELECTRON_DEVTOOLS/CONSOLE`,
                    key,
                    args.map(element => jsonify(element)),
                );
            } catch (error) {
                defaultLogger.error(error);
            }
        };
    });
};

(function(): void {
    const isRenderer = (): boolean => {
        // running in a web browser
        if (typeof process === 'undefined') {
            return true;
        }

        // node-integration is disabled
        if (!process) {
            return true;
        }

        // We're in node.js somehow
        if (!process.type) {
            return false;
        }

        return process.type === 'renderer';
    };
    if (isRenderer()) {
        process.once('loaded', consoleProxy);
    }
})();

export default consoleProxy;
