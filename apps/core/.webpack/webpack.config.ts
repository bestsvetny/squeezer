import { resolve } from 'node:path';

import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('dev', isDev);

const rootDir = resolve(__dirname, '..');
const currDir = resolve(__dirname);

/*TODO: fix build stats*/
/*TODO: husky, commit linters, final checks*/
/*TODO: dev server: assets hot reload*/
/*TODO: image minimize, svg test*/
/*TODO: define stack, schemas, describe tasks*/
/*TODO: dotenv*/

/*TODO: Specs, Storybook, Nx automation*/

/*TODO: CICD, docker nginx*/

/*TODO: Improve monorepo and core build*/
/*TODO: pwa, micro-frontends, CSSNANO minify*/

/*TODO: React buddy*/
/*TODO: why did you render*/

const optimization = (isProd: boolean) => {
    /*TODO: test*/
    const config = {
        splitChunks: {
            chunks: 'all',
            minSize: 1,
            minChunks: 1,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: isProd ? [new TerserPlugin({ extractComments: true }), new CssMinimizerPlugin()] : []
    };

    return config as webpack.Configuration['optimization'];
};

const plugins = (isProd: boolean) => {
    const plugins = [
        new HtmlPlugin({
            template: resolve(currDir, 'template.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(rootDir, 'public'),
                    to: resolve(rootDir, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new Dotenv({
            path: isDev ? resolve(rootDir, '.development.env') : resolve(rootDir, '../../.env')
        })
    ];

    if (isProd) {
        /* empty */
    }

    return plugins;
};

module.exports = {
    context: resolve(rootDir, 'src'),
    mode: 'production',
    target: 'web',
    entry: {
        main: './index.tsx'
    },
    output: {
        filename: isProd ? 'js/[name]-[contenthash:8].js' : 'js/[name].js',
        chunkFilename: 'js/chunk.[name].js',
        assetModuleFilename: 'assets/[contenthash:8][ext][query]',
        path: resolve(rootDir, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        plugins: [new TsconfigPathsPlugin({})]
    },
    devtool: !isProd ? 'eval-cheap-module-source-map' : false,
    devServer: {
        port: 4001
    } as DevServerConfiguration,
    optimization: optimization(isProd),
    plugins: plugins(isProd),
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.m?js/,
                include: /node_modules/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.module.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: 'ui_[local]__[hash:base64:7]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: resolve(currDir, 'postcss.config.cjs')
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /\.module.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: resolve(currDir, 'postcss.config.cjs')
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            }
        ]
    }
} satisfies webpack.Configuration;
