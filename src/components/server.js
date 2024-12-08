const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create an Express app
const app = express();

// The target server you want to bypass CORS for
const targetServer = 'http://65.2.153.173:8443'; // Replace with the actual API server URL


// Proxy all requests to the target server
app.use('/api', createProxyMiddleware({
  target: targetServer,            // The API server to forward the requests to
  changeOrigin: true,              // Ensures that the `Origin` header is modified to the target server's domain
  secure: false,                   // Disable SSL verification for development purposes (if you're using HTTP)
  logLevel: 'debug',               // Optional: For logging and debugging
}));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
