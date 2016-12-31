module.exports = {
  entry: {
    init: './src/init.js',
    app: './src/app/index.js'
  },
  output: {
    filename: '[name].js',
    path: './lib'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["latest", "react"],
          plugins: ["transform-runtime", "transform-object-rest-spread"]
        }
      }
    ]
  }
}
