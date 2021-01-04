const path = require('path');

module.exports = {
  entry: { main: './src/index.tsx' },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  node: {
    global: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};
