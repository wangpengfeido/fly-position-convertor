/**
 * Created by w1036_000 on 2017/7/6.
 * webpack配置文件
 */

const path = require('path');
const webpack = require('webpack');

function getWebpackConfig() {
    const config = {
        entry:{
            flyPositionConvertor:path.resolve(__dirname,'./index.js'),
        },
        output:{
            path:path.resolve(__dirname,'./dist'),
            filename:'[name].js',
            library:'flyPositionConvertor',
            libraryTarget: 'umd',
        },
        module:{
            rules:[{test:/\.js$/,loader:'babel-loader'}]
        },
        // plugins:[
        //   new webpack.optimize.UglifyJsPlugin(),
        // ],
    };

    return config;
}


module.exports = getWebpackConfig();
