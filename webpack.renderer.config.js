const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { sass } = require('svelte-preprocess-sass');
const sveltePreprocess = require('svelte-preprocess');

const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        index: ['./src/renderer/main.js'],
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
            loglevel: path.resolve('node_modules', 'loglevel', 'lib', 'loglevel.js'),
        },
        extensions: ['.mjs', '.js', '.svelte', '.ts'],
        mainFields: ['module', 'svelte'],
    },
    output: {
        path: __dirname + '/dist/renderer',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        preprocess: [
                            sass(),
                            sveltePreprocess({
                                scss: true,
                            }),
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    /**
                     * MiniCssExtractPlugin doesn't support HMR.
                     * For developing, use 'style-loader' instead.
                     * */
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    target: 'web',
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/renderer/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        writeToDisk: true,
        liveReload: true,
        contentBase: path.join(__dirname, 'dist', 'renderer'),
    },
    devtool: prod ? false : 'source-map',
};
