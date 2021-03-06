const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

class CustomPlugin {
    constructor() {
        this.name = 'ElectronConnect';
        this.electron = require('electron-connect').server.create({ path: __dirname });
        this.electron.start();
    }

    apply(compiler) {
        compiler.hooks.done.tap(this.name, () => {
            console.log('done');
            this.electron.restart();
        });
    }
}

const config = {
    entry: {
        logsProxy: ['./src/main/logsProxy.ts'],
        'main/index': ['./src/main/index.ts'],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
                extensions: ['.ts', '.js', '.json'],
                baseUrl: '.',
            }),
        ],
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    target: 'electron-main',
    mode,
    devtool: prod ? false : 'source-map',
};

if (mode === 'development') {
    config.plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/testApp/index.html',
            filename: 'testApp/index.html',
            inject: false,
            chunks: ['testApp/index'],
        }),
        new CustomPlugin(),
    ];
    config.devServer = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        writeToDisk: true,
        port: 1234,
        clientLogLevel: 'silent',
    };
    config.entry = {
        logsProxy: ['./src/main/logsProxy.ts'],
        'testApp/index': ['./src/testApp/index.ts'],
        'testApp/testApp': ['./src/testApp/testApp.js'],
    };
}

module.exports = config;
