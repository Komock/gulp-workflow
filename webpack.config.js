const webpack = require('webpack');
const path = require('path');

const isProduction = false;

const webpackConfig = {
	stats: 'verbose',
	output: {
		filename: '[name].js',
		publicPath: '/js/' // for dynamic modules
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							browsers: ['ie > 9']
						}]
					]
				}
			}
		}]
	},
	devtool: isProduction ? false : 'cheap-module-inline-source-map',
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			minChunks: 2,
			name: 'common',
			filename: 'common.js'
		})
	],
	watch: !isProduction
};

if (isProduction) {
	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: isProduction ? false : true,
			compress: { warnings: false }
		})
	);
}

module.exports = webpackConfig;