const Bundler = require('parcel-bundler');
const path = require('path');
const electron = require('electron-connect').server.create({ path: __dirname });

const runBundleRenderer = async () => {
    const file = path.join(__dirname, './src/index.html');

    const options = {
        outDir: './dist/renderer/',
        outFile: 'index.html',
        contentHash: false,
        serve: process.env.NODE_ENV === 'development',
        publicUrl: '/dist/renderer/',
        target: 'browser',
        detailedReport: false,
    };
    const bundler = new Bundler(file, options);
    await bundler.serve();
    if (process.env.NODE_ENV !== 'development') {
        process.exit(0);
    }
};

const runBundleMain = async () => {
    const file = path.join(__dirname, './src/main/index.ts');
    const options = {
        outDir: './dist/main/',
        outFile: 'index.js',
        hmr: false,
        serve: process.env.NODE_ENV === 'development',
        contentHash: false,
        target: 'node',
        detailedReport: true,
    };
    const bundler = new Bundler(file, options);
    await bundler.bundle();
    if (process.env.NODE_ENV !== 'development') {
        process.exit(0);
    }
    electron.start();
    bundler.on('buildEnd', () => {
        electron.restart();
    });
};

const init = async () => {
    await runBundleRenderer();
    await runBundleMain();
};

init();
