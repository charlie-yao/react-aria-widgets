import type { StorybookConfig } from '@storybook/react-webpack5';

//Misc.
import {
  SCSS_LOADER,
  MINI_CSS_EXTRACT_PLUGIN,
  commonConfig
} from '../webpack.common.js';


const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async config => {
    config.resolve = config.resolve ?? {};
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.plugins = config.plugins ?? [];

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...commonConfig.resolve.alias,
        },
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          SCSS_LOADER,
        ],
      },
      plugins: [
        ...config.plugins,
        MINI_CSS_EXTRACT_PLUGIN,
      ] as any[],
    };
  },
  docs: {
    autodocs: true
  }
};

export default config;
