const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader'
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            },
            {
                test: /\.(json)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[folder]/[name].[ext]',
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[path][name].[ext]',
                    }
                }
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname,  'dist'),
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                secure: false,
                changeOrigin: true,
                autoRewrite: true,
            }
        },
        historyApiFallback: true
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src',
            to: ''
        }]),
        new HtmlWebpackPlugin({
            title: 'ТУРНИРКЕН',
            filename: "index.html",
            template: "./src/index.html"
        }),
        new HtmlWebpackHarddiskPlugin()]
};
