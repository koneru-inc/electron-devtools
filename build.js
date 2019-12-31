const Bundler = require('parcel-bundler');
const path = require('path');
const electron = require('electron-connect').server.create({ path: __dirname });

const runBundleRenderer = async () => {
    const file = path.join(__dirname, './src/index.html');

    const options = {
        outDir: './dist/renderer/',
        outFile: 'index.html',
        contentHash: false,
        publicUrl: '/dist/renderer/',
        target: 'browser',
        detailedReport: false,
    };
    const bundler = new Bundler(file, options);
    const bundle = await bundler.serve();
};

const runBundleMain = async () => {
    const file = path.join(__dirname, './src/main/index.js');
    const options = {
        outDir: './dist/main/',
        outFile: 'index.js',
        hmr: false,
        contentHash: false,
        target: 'node',
        detailedReport: true,
    };
    const bundler = new Bundler(file, options);
    const bundle = await bundler.bundle();
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
