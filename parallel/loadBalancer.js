const http = require('http');
const express = require('express');
const os = require('os');
const { createProxyMiddleware } = require('http-proxy-middleware');

const numCPUs = os.availableParallelism();

let apiPorts = [];
let PORT = parseInt(process.env.PORT);

let currentIndex = 0;

// Create Express app
const app = express();

for (let i = 1; i < numCPUs; i++) {
  console.log('here');
  apiPorts.push(PORT + i);
}

const getTarget = (req) => {
  // return `http://localhost:3001`;
  let targetPort = apiPorts[currentIndex];
  let url = `http://localhost:${process.env.PORT}`;
  // url += req.url;
  let targetUrl = url.replace(process.env.PORT, targetPort);
  currentIndex = (currentIndex + 1) % apiPorts.length;
  console.log(targetUrl);
  return targetUrl;
};

const proxyMiddleware = createProxyMiddleware({
  target: `http://localhost`,
  changeOrigin: true,
  router: getTarget,
});

// app.use('/', (req, res) => {
//   res.redirect(req);
//   currentIndex = (currentIndex + 1) % apiPorts.length;
// });
app.use('/', proxyMiddleware);

const server = http.createServer(app);

module.exports = server;
