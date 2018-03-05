const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, '..'),
	entry: './src/less/mainLess.js',
	output: {
		path: path.resolve(__dirname, '../dev_build'),
		filename: './js/less_output.js'
	},
	devServer: {	// 请使用iframe方式调试  loaclhost:5001/webpack-dev-server/
		contentBase: path.resolve(__dirname, '../dev_build'),
		open: true,
		port: 5001,
		historyApiFallback: true
	},
	module: {
		rules: [
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
				/*
					&outputPath 是相对于 打包输出路径的， 这里表示在打包路径下 创建一个名为fonts的目录
					&publicPath 不影响目录创建的位置， 但是他会影响css中 url路径， 以下设置表示 在css中
					凡符合test正则的 url， 都在url前面拼接 ../  这个路径 可以吧publicPath 当作校准相对于
					css文件与静态资源的相对关系
					less中写url时 就以less文件自己的路径 相对于资源路径 为准
				*/
				loader: "file-loader?name=[name].[ext]&publicPath=../&outputPath=fonts/" 
			},
			{
				test: /\.(jpeg|png|bmp|gif)([\?]?.*)$/,
				loader: "file-loader?name=[name].[ext]&publicPath=../&outputPath=img/" 
			}
		]
	},
	plugins: [
        new CleanWebpackPlugin(		// 删除文件
        		['dev_build/css/main.css', 'dev_build/css/main.min.css'],
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









