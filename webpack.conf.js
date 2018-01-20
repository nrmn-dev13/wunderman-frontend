import webpack from "webpack";
import path from "path";

export default {
  module: {
    loaders: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=/[hash].[ext]"
      },
      {test: /\.json$/, loader: "json-loader"},
      {
        loader: "babel",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      // "fetch": "imports?this=>global!exports?global.fetch!whatwg-fetch",
      $: "jquery",
      jQuery: "jquery"
    })
  ],

  context: path.join(__dirname, "src"),
  entry: {
    vendor: ["./js/vendor"],
    custom: ["./js/custom"]
  },
  output: {
    path: path.join(__dirname, "site"),
    publicPath: "./assets/js",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};
