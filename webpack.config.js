var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    noInfo: false,
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
        entryFile: path.resolve(__dirname, 'src/index.html')
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', 'scss']
    },
    plugins: [
        //new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), // evide errer
        new HtmlWebpackPlugin({ template: "src/index.html" })
    ],
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};

module.exports = config;