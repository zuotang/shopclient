const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://shop.yfyundong.com/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/", // rewrite path
      },
    })
  );
};
