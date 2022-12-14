const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  mode: 'production',
  output: {
    filename: `main.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    static: './public',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  resolve: {
    extensions: [`.js`, `json`]
  },
};