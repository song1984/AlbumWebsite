const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		plugin: './src/js/entryPlugin.js',
		main: './src/jsx/index.js',
		outputLess: './src/less/mainLess.js'
	},
	context: path.resolve(__dirname, '..'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: './js/[name].js'
	},
	module: {
		rules: [
			{
	        	test: /\.(js|jsx)$/,
	        	exclude: /node_modules/,
	        	loader: 'babel-loader',
	        	options: {
	          		presets: ['es2015', 'react']
	        	}
	      	},
	      	{
	      		test: /\.(jpg|png|jpeg|bmp)$/,
	      		use: "file-loader?name=[name].[ext]&publicPath=./&outputPath=img/"
	      	},
	      	{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								url: true,
								minimize: true
							}
						}, 
						'less-loader'
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
				loader: "file-loader?name=[name].[ext]&publicPath=../&outputPath=fonts/" 
			}
		]
	},
	plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(		// 删除文件
	    		['dist/js/plugin.js', 'dist/js/main.js', 'dist/js/outputLess.js', 'dist/css/main.css'],
	    		{
	           		root: path.resolve(__dirname, '..'),	// 项目根目录
	    			verbose: true,	// 是否控制台输出
	    			dry: false
	    		}
    	),
    	 new ExtractTextPlugin({
        	filename: './css/main.css',
        	disable: false,
        	allChunks: true
        })
    ]
}