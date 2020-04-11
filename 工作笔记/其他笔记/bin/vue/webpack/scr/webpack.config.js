//webpack的配置文件  其实就是node中的模块操作，向外暴露了一个配置对象


/*
在没有配置文件的情况下需要输入：webpack 输入路径 输出路径

有配置文件的情况下就只要输入：webpack
*/

const path=require('path')

module.exports = {

  entry: path.join(_dirname, './scr/main.js'),//入口
  output: {//出口
    path: path.join(_dirname, './dist'),
    filename:'bundle.js'
  },
  plugins: [//所有webpack 插件的配置节点
    new htmlWebpackPlugin({
      template: path.join(_dirname, './scr/index.html'),//指定模板文件的路径
      filename: 'index.html'//设置生成的内存页面名称
    })
  ],
  module: {//配置所有第三方loader模板的
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },//处理css文件的loader
      { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader'] },//处理less文件的loader
      { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },//处理scss文件的loader
      { test: /\.(jpg|png|gif|bmg|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },//处理图片路径的loader
       //limit图片的大小byte  name图片的名字
    ]

  },
  resolve: {//修改vue被导入时候的包的路径
    alias: {
      "vue$": "vue/dist/vue.js"
    }
  }

}