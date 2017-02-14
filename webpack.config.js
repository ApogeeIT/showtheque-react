var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        //"webpack-hot-middleware/client?http://localhost:8080", //reload=true //reload=true? 
        /*'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',*/
        //'webpack-hot-middleware/client?reload=true',
        //'webpack/hot/only-dev-server',
        //"webpack-dev-server/client?http://localhost:8081",
        //"webpack/hot/only-dev-server",
        /*"react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8081",
        "webpack/hot/only-dev-server",*/
        
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server', //rrechar en cas d'errur de hmr'
        //'webpack/hot/dev-server',
        //"webpack-hot-middleware/client?http://localhost:8081",
        './src/app/index.tsx'
    ],
    target: 'web',
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'app.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 8081,
        //entry: path.resolve(__dirname, 'src/index.html')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    plugins: [
        //new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // evide errer
        new HtmlWebpackPlugin({ template: "src/index.html" })
    ],
    module: {
        rules: [
            { test: /\.ts(x?)$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            /*{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: 'url?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=image/svg+xml' },*/
            { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" },
            { test: /\.js$/, enforce: 'pre', use: 'source-map-loader' }

        ]
    }
};

module.exports = config;