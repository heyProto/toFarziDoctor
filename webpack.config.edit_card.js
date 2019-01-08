const webpack = require('webpack');

module.exports = {
  entry: ['./main.js','./main_edit.js'],
  output: {
    path: './',
    filename: './dist/0.0.1/edit-card.min.js'
  },
  plugin: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '../../lib/js/react-jsonschema-form': 'JSONSchemaForm',
    'axios': 'axios'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      // {
      //     test: /\.css$/,
      //     loader: "css-loader",
      //     query: {
      //       modules: true,
      //       localIdentName: "[name]__[local]___[hash:base64:5]"
      //     }},
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
