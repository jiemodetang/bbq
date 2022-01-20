const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://54.169.111.234:8081",
            changeOrigin: true,
        })
    );
};
