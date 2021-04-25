const IsProd = process.env.NODE_ENV === 'prod';
const date = new Date();
const Version=''+date .getFullYear()+date .getMonth()+date .getDate()+date.getHours();
module.exports = {
    runtimeCompiler: true,
    indexPath: "index.html",
    publicPath: '/', // 设置打包文件相对路径
    outputDir: 'dist',
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints: false
        },
        output: { // 输出重构  打包编译后的 文件名称  【版本号】
            filename: `js/[name].${Version}.js`,
            chunkFilename: `js/[name].${Version}.js`,
        }
    },
    productionSourceMap: IsProd ? false : true,
    chainWebpack:(config)=>{
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
}
