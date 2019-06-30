//webpack 配置文件
console.log("webpack");



// webpack 学习的目的就是文件打包 和 模块化开发
// js 处理ES6 ES7 jsx语法
// png jpg gif  iconfont 
// less css scss
// string 

var path = require("path"); //node内置模块 无需安装
var htmlWebpackPlugin = require("html-webpack-plugin"); //处理HTML文件
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin");  //自动打开浏览器
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");  //抽离样式
var webpack = require("webpack");

module.exports = {
    entry: ["./src/main.js"], //入口
    output: { //出口
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[hash:8].js", //hash:8 加密得到长度8的字符串 为了阻止文件缓存
        publicPath: "", //文件的公共路径
    },

    devtool: "source-map", //方便在线调试

    resolve: {
        alias: { //别名  @ ==> src文件夹
            "@": path.resolve("src"),
            "~": path.resolve("src/scripts")
        }
    },

    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                // use:["url-loader?limit=8192&name=imgs/[name].[hash:8].[ext]"]
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "imgs/[name].[hash:8].[ext]"
                    }
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader", //把node字符串代码转化为style节点
                    use: [
                        "css-loader",  //转为commonJS规范的模块
                        {
                            loader: "postcss-loader", //css代码转化
                            options: {
                                plugins: function () {
                                    return [
                                        require("cssgrace"), //代码美化
                                        require("autoprefixer"), //自动补全
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit: 100,  //200px / 100 = 2rem
                                                exclude: /antd-mobile/i   //排除UI库适配
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                })
            }
        ]
    },

    devServer: { //配置服务器 webpack-dev-server 开发使用
        contentBase: path.join(__dirname, "dist"), //服务器作用于 dist
        host: "0.0.0.0",
        port: 8000,
        compress: true, //压缩
        hot: true,
        inline: true,
        // open:true,
        publicPath: "",  //设置打包的相对路径
        proxy: { //代理
            "/vue": {
                target: "http://47.102.217.191:6300/",
                changeOrigin: true,
            },
            "/react": {
                target: "http://47.102.217.191:2000/",
                changeOrigin: true,
            }
        }
    },

    plugins: [ //声明使用的插件
        new openBrowserWebpackPlugin({
            url: "http://localhost:8000"
        }),
        new htmlWebpackPlugin({
            template: "./public/index.html",
            inject: true, //自动引入 打包的css 和 js 文件
        }),
        new extractTextWebpackPlugin({
            filename: "css/app.[hash:8].css",
            allChunks: true, // 打包所有样式数据
            disable: false  // false 样式抽离
        }),

        // 自动引入
        new webpack.ProvidePlugin({
            React: "React",
            Component: ['react', 'Component']
        })
    ]


}