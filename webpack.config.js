// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: {
        index: './src/index.js',
        // definition: './src/definition.js'
    },
    output: {
        filename: '[name]-bundle.js',
        clean: true,
        path: path.resolve(__dirname, 'app'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        liveReload: true,
        port: 3000,
        static: {
            directory: path.join(__dirname, "app"),
        },
        hot: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            inject: true,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                description: "Project",
            },
            template: './src/index.html',
            filename: '../app/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['definition'],
        //     inject: true,
        //     meta: {
        //         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        //         description: "Project",
        //     },
        //     template: './src/definition.html',
        //     filename: '../app/definition.html',
        // }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.html?$/i,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults"}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ],
            },
            {
                test: /\.(eot|svg|jpe?g|png|gif|webp|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]',
                },
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js$/i,
                exclude: /node_modules/,
            }),
            new ImageMinimizerPlugin({
                generator: [
                    {
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                webp: {
                                    quality: 80,
                                },
                            },
                        },
                    },
                ],
            }),
        ],
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
