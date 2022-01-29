const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://13.212.197.232:8081",
            changeOrigin: true,
        })
    );
};
