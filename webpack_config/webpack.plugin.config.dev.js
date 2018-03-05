const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	context: path.resolve(__dirname, '..'),
	entry: './src/js/entryPlugin.js',
	output: {
		path: path.resolve(__dirname, '../dev_build'),
		filename: './js/plugin.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, '../dev_build'),
		open: true,
		port: 5001,
		inline: true
	},
	module: {
		rules: [
			{
	        	test: /\.js$/,
	        	exclude: /node_modules/,
	        	use:[
	        		{
	        			loader: 'babel-loader',
	        			options: {
	          				presets: ['es2015']
	        			}
	        		},
	        		{
	        			loader: 'jshint-loader'
	        		}
	        	]
	      	}
		]
	},
	plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(		// 删除文件
        		['dev_build/js/plugin.js'],
        		{
               		root: path.resolve(__dirname, '..'),	// 项目根目录
        			verbose: true,	// 是否控制台输出
        			dry: false
        		}
        )
    ]
}









