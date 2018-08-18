const path = require("path");

var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/dist/",
    publicPath: "/dist",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2", "flow"]
        }
      },

      {
        test: /\.css$/,
        loader:
          "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin()
    // other plugins ...
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/"),
      Redux: path.resolve(__dirname, "src/Redux")
    }
  },
  devtool: "source-map"
};
