const path = require('path');
const webpack = require('webpack')
//const sassMaster = require('./sassMaster') //Simple sass handling


module.exports = {
  entry : path.join(__dirname, 'src/main.js'),
  mode : process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output : {
    path : path.resolve(__dirname, 'public/js')
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : 'babel-loader'
      }
    ]
  },
  plugins : [
    new webpack.ProvidePlugin({
      $ : 'jquery',
      jQuery : 'jquery'
    })
  ]
}
