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

const cjsConfig = {
  output: {
    filename: '[name].bundle.cjs',
    path: path.resolve(__dirname, 'dist/cjs'),
    library: {
      type: 'commonjs2',
    },
  },
};

const esmConfig = {
  output: {
    filename: '[name].bundle.mjs',
    path: path.resolve(__dirname, 'dist/esm'),
    library: {
      type: 'module',
    },
    environment: {
      module: true,
    },
    module: true,
  },
  experiments: {
    outputModule: true,
  },
};

const commonConfig = {
  resolve: {
    extensions: [ '.js', '.json', '.jsx', '.ts', '.tsx' ],
  },
  entry: {
    index: {
      import: './src/index.ts',
    },
    accordion: {
      import: './src/Accordion/index.ts',
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
};

module.exports = {
  SCSS_LOADER,
  MINI_CSS_EXTRACT_PLUGIN,
  cjsConfig,
  esmConfig,
  commonConfig,
};
