const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	context: path.resolve(__dirname, '..'),
	entry: './src/jsx/index.js',
	output: {
		path: path.resolve(__dirname, '../dev_build'),
		filename: './js/main.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, '../dev_build'),
		open: true,
		port: 5001,
		inline: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
	        	test: /\.(js|jsx)$/,
	        	exclude: /node_modules/,
	        	use:[
	        		{
	        			loader: 'babel-loader',
	        			options: {
	          				presets: ['es2015', 'react']
	        			}
	        		},
	        		{
	        			loader: 'jshint-loader'
	        		},
	        	]
	      	},
	      	{
	      		test: /\.(jpg|png|jpeg|bmp)$/,
	      		use: "file-loader?name=[name].[ext]&publicPath=./&outputPath=img/"
	      	}
		]
	},
	plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(		// 删除文件
        		['js/main.js'],
        		{
               		root: path.resolve(__dirname, '..'),	// 项目根目录
        			verbose: true,	// 是否控制台输出
        			dry: false
        		}
        )
    ]
}









