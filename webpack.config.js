const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	devtool: 'source-map',
	entry: {
		bundle:['babel-polyfill','./src/main.js'],
		vendors:[
			'vue',
			'vuex'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].js',
		chunkFilename: "[id].chunk.js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({name:"vendors",filename:"vendors.js"}),
		// new ExtractTextPlugin("[name].css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		// new htmlWebpackPlugin({
		// 	template: '1.html',
		// 	title: "Weshare Ebooking",
		// 	minify: {
		// 		removeAttributeQuotes: true
		// 	},
		// 	inject: true,
		// 	"files": {
		// 		"css": ["./styles/main.css"]
		// 	}
		// })
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
