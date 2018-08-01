const {path, resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: resolve(__dirname, 'src'),

	entry: [
		'webpack-dev-server/client?http://localhost:8088',
		'./index.ts'
	],

	output: {
		filename: 'sessionlayer.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	devtool: 'source-map',

	devServer: {
		hot: false,
		contentBase: resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: 'awesome-typescript-loader',
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: '',
			template: 'public/index.html'
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};
