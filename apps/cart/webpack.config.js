// This file configures the standalone cart microfrontend build and dev server.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');

const { ModuleFederationPlugin } = container;
const deps = require('./package.json').dependencies;
const rootDir = path.resolve(__dirname, '../..');

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: 'auto',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@mf-demo/shared': path.resolve(rootDir, 'packages/shared/src'),
      '@mf-demo/ui-kit': path.resolve(rootDir, 'packages/ui-kit/src')
    }
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['tailwindcss', { config: path.resolve(rootDir, 'tailwind.config.js') }],
                  ['autoprefixer']
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App'
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
        '@mf-demo/shared': { singleton: true, requiredVersion: deps['@mf-demo/shared'] },
        '@mf-demo/ui-kit': { singleton: true, requiredVersion: deps['@mf-demo/ui-kit'] }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
