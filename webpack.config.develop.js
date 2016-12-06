/**
 * Created by Totooria Hyperion on 2016/11/24.
 */
"use strict";
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	// 入口文件
	// entry: {
	// 	bundle: ['babel-polyfill', './src/main.js'],
	// 	vendors: [
	// 		'vue',
	// 		'vuex',
	// 	],
	// },
	entry:['babel-polyfill', './src/main.js'],
	output: {
		// 打包后输出的目录
		path: path.resolve(__dirname, './dist'),
		// 打包后资源文件的前缀
		// publicPath: '/dist/',
		publicPath: 'http://localhost:9099/',
		filename: '[name].js',
		chunkFilename: "[id].chunk.js"
	},
	resolve: {
		// require时省略的扩展名，如：require('module') 不需要module.js
		extensions: ['', '.js', '.vue'],
		// 别名
		alias: {
			components: path.join(__dirname, './src/components')
		}
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	// 处理不同后缀的文件
	module: {
		loaders: [
			// {
			// 	test: /\.js$/,
			// 	// loaders: ['babel?' + JSON.stringify({presets: ['es2015', 'stage-0', 'stage-1']})],
			// 	loader: 'babel?' + JSON.stringify({presets: ['es2015', 'stage-0', 'stage-1']}),
			// 	exclude: /node_modules/
			// },
			{
				test: /\.vue$/,
				// loaders: ['babel?' + JSON.stringify({presets: ['es2015', 'stage-2']}),'vue'],
				// loaders: ['vue','babel?' + JSON.stringify({presets: ['es2015', 'stage-0', 'stage-1', 'stage-2']})],
				loader: 'vue',
				// loader: 'babel?' + JSON.stringify({presets: ['vue-loader','es2015', 'stage-0', 'stage-1']}),
				// presets:['es2015'],
			},
			// {
			// 	test: /\.vue$/,
			// 	loader: 'vue-loader'
			// },
			{
				test: /\.js$/,
				loader: 'babel?' + JSON.stringify({presets: ['es2015', 'stage-0', 'stage-1']}),
				// loader: 'babel',
				exclude: [/node_modules/,/publish/]
			},

			{
				test: /\.css$/,
				loader: 'vue-style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: 'vue-style-loader!css-loader!less-loader'
			},
			// { test: /\.scss$/, loaders: [
			// 	'style',
			// 	'css',
			// 	'sass'
			// ] },

			{
				test: /\.(png|jpg|jpeg|gif)$/, loader: 'file'
			},
			{
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
			}
		]
	},
	// webpack-dev-server配置
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		hot: true,
		inline: true,
	},
	// 开启source-map，webpack有多种source-map，在官网文档可以查到
	devtool: '#eval-source-map',
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		// new ExtractTextPlugin("[name].css"),
		// new webpack.DefinePlugin({
		// 	"process.env": {
		// 		NODE_ENV: JSON.stringify("development")
		// 	}
		// }),
		new htmlWebpackPlugin({
			template: 'index.html',
			// title: "Weshare Ebooking",
			// minify: {
			// 	removeAttributeQuotes: true
			// },
			// inject: true,
			// "files": {
			// 	"css": ["./styles/main.css"]
			// }
		})
	],
}

// 生产环境，运行npm run build则执行这里
if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		// 环境变量
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		// 压缩代码
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	])
}
