const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: { main: './src/index.tsx' },
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
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
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: "umd"
    }
  }
};
