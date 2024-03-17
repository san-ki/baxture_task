const cluster = require('cluster');
const os = require('os');
const dotenv = require('dotenv');

dotenv.config();

const numCPUs = os.availableParallelism();

let PORT = parseInt(process.env.PORT),
  curCount = 0;
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork({ PORT: PORT++ });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = require('./dist/main.js');
  app.default(process.env.PORT);
  console.log(`Worker ${process.pid} started ${process.env.PORT}`);
}
