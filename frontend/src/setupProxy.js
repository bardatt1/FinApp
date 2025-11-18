const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        // Increase timeout for large requests (base64 images)
        proxyReq.setTimeout(60000); // 60 seconds
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      }
    })
  );
};


