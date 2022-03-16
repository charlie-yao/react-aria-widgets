//Misc.
const customConfig = require('../webpack.config.js');

module.exports = {
	"stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	"addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
	"framework": "@storybook/react",
	core: {
		builder: "webpack5",
	},
	webpackFinal: async (config) => {
		Object.assign(config.resolve.alias, customConfig.resolve.alias);
		
		/*
		 * Even though React Storybook gives a suggestion that we can do
		 * something like:
		 *
		 * return { ...config, module: { ...config.module, rules: custom.module.rules } };
		 *
		 * It doesn't seem to work. At the very least, the problem seems to
		 * be with style-loader or css-loader. It also shows up whether we
		 * totally replace config.module.rules (e.g. the above example) or
		 * if we append ALL of our rules to config.module.rules (i.e. iterating
		 * over our rules and doing config.module.rules.push()).
		 *
		 * tl;dr be careful of what rules are appended/overwritten
		 *
		 * See: https://storybook.js.org/docs/react/configure/webpack#using-your-existing-config
		 */
		config.module.rules.push(customConfig.SCSS_LOADER);

		return config;
	},
};
