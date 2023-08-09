const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const SCSS_LOADER = {
  test: /\.scss$/u,
  use: [ MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader' ],
};

const MINI_CSS_EXTRACT_PLUGIN = new MiniCSSExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
});

module.exports = {
  SCSS_LOADER,
  MINI_CSS_EXTRACT_PLUGIN,
  commonConfig: {
    resolve: {
      extensions: [ '.js', '.json', '.jsx', '.ts', '.tsx' ],
      alias: {
        src: path.resolve(__dirname, 'src/'),
      },
    },
    entry: {
      index: {
        import: './src/index.ts',
      },
      accordion: {
        import: './src/Accordion/index.ts',
      },
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      library: {
        name: '[name]',
        type: 'umd',
      },
    },
    externals: {
      react: 'react',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.build.json',
          },
        },
        {
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css$/u,
          use: [ MiniCSSExtractPlugin.loader, 'css-loader' ],
        },
        SCSS_LOADER,
      ],
    },
    plugins: [
      MINI_CSS_EXTRACT_PLUGIN,
    ],
  },
};
