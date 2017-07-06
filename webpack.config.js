/**
 * Created by w1036_000 on 2017/7/6.
 * webpack配置文件
 */

const path = require('path');
const webpack = require('webpack');

function getWebpackConfig() {
    const config = {
        entry:{
            index:path.resolve(__dirname,'src/index.js'),
        },
        output:{
            path:path.resolve(__dirname,'dist'),
            filename:'[name].min.js'
        },
        module:{
            rules:[{test:/\.js$/,loader:'babel-loader'}]
        },
        plugins:[
          new webpack.optimize.UglifyJsPlugin(),
        ],
    };

    return config;
}


module.exports = getWebpackConfig();
