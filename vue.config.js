module.exports = {
  publicPath: './',
  chainWebpack: config => {
    if (process.env.NODE_ENV === "lib") {
      config.module.rule("ts").uses.delete("cache-loader");
      config.module
        .rule("ts")
        .use("ts-loader")
        .loader("ts-loader")
        .tap(opts => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
  productionSourceMap: false,
  parallel: false
};