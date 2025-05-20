const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const createCommonConfig = (tsconfigPath) => ({
  mode: 'production',
  entry: './src/plurality-modal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          /(node_modules)/,
          path.resolve(__dirname, 'src/pages')
        ],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: tsconfigPath
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [
          /(node_modules)/,
          path.resolve(__dirname, 'src/pages')
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [new webpack.DefinePlugin(envKeys)]
});

// Export multiple builds
module.exports = [
  // ✅ ESM Build
  {
    ...createCommonConfig(path.resolve(__dirname, 'tsconfig.esm.json')),
    output: {
      path: path.resolve(__dirname, 'dist/esm'),
      filename: 'index.js',
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'styled-components': 'styled-components',
      antd: 'antd'
    }
  },
  // ✅ CommonJS Build
  {
    ...createCommonConfig(path.resolve(__dirname, 'tsconfig.cjs.json')),
    output: {
      path: path.resolve(__dirname, 'dist/cjs'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    }
  }
];
