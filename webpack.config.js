const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const commonConfig = {
  mode: 'production',
  entry: './src/plurality-modal', 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          /(node_modules)/, // Exclude node_modules
          path.resolve(__dirname, 'src/pages') // Exclude the src/pages folder
        ],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true // Skip type-checking, `tsc` handles that
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: [
          /(node_modules)/, // Exclude node_modules
          path.resolve(__dirname, 'src/pages') // Exclude the src/pages folder
        ],
        use: 'babel-loader',
      },
      // CSS files
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
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
};

// Export multiple builds
module.exports = [
  // ✅ CommonJS Build
  {
    ...commonConfig,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    }
  },

  // ✅ UMD Build (For CDN & Browser Compatibility)
  {
    ...commonConfig,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.umd.js',
      library: 'PluralitySocialConnect',
      libraryTarget: 'umd',
      globalObject: 'this', 
      libraryExport: 'default',
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }
    }
  }
];
