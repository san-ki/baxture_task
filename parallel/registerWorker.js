const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cluster = require('cluster');
const os = require('os');
dotenv.config();

const numCPUs = os.availableParallelism();

let PORT = parseInt(process.env.PORT);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT++, ID: i });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  if (process.env.ID == 0) {
    let server = require('./new');
    server.listen(process.env.PORT, () => {
      console.log(`loadbalancer on ${process.env.PORT}`);
    });
  } else {
    const app = require('../dist/main.js');
    app.default(process.env.PORT);
  }
  console.log(`Worker ${process.pid} started ${process.env.PORT}`);
}
