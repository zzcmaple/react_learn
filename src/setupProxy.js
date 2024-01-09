const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/aaaa', createProxyMiddleware({
    target: 'https://apis.map.qq.com',//后台服务器地址
    changeOrigin: true,
    pathRewrite: {
      '^/aaaaa': '',
    },}))
};
