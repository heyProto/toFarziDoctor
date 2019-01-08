const webpack = require("webpack");
const card = require("./webpack.config.card.js");
const edit_card = require("./webpack.config.edit_card.js");

module.exports = [
  card,
  edit_card,
  {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ["style-loader", "css-loader"]
        },
        // {
        //   test: /\.css$/,
        //   loader: "css-loader",
        //   query: {
        //     modules: true,
        //     localIdentName: "[name]__[local]___[hash:base64:5]"
        //   }
        // }
      ]
    }
  }
];
