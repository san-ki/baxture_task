const http = require('http');
const express = require('express');
const db = require('./db/Db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const waitFor1Sec = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });
};

app.get('/users', async (req, res) => {
  console.log('req', db.isFree);
  while (!db.isFree) {
    await waitFor1Sec();
  }
  db.toggleFree();
  let result = db.getAll();
  res.send(result);
  db.toggleFree();
});

app.get('/users/:userid', async (req, res) => {
  console.log('req', db.isFree);
  while (!db.isFree) {
    await waitFor1Sec();
  }
  db.toggleFree();
  let result = db.getOne(req.params.userid);
  res.send(result);
  db.toggleFree();
});

app.post('/users', async (req, res) => {
  console.log('req', db.isFree);
  while (!db.isFree) {
    await waitFor1Sec();
  }
  db.toggleFree();
  console.log(req.body);
  let result = db.create(req.body);
  res.send(result);
  db.toggleFree();
});

app.put('/users/:userid', async (req, res) => {
  console.log('req', req.params.userid, 'putcall');
  while (!db.isFree) {
    await waitFor1Sec();
  }
  db.toggleFree();
  let result = db.put(req.body);
  res.send(result);
  db.toggleFree();
});

app.delete('/users/:userid', async (req, res) => {
  console.log('req', req.params.userid, 'deletecall');
  while (!db.isFree) {
    await waitFor1Sec();
  }
  db.toggleFree();
  let result = db.delete(req.params.userid);
  res.send(result);
  db.toggleFree();
});

console.log('spawning db...');
const server = http.createServer(app);

console.log(process.argv.slice(2));
let portIndex = process.argv.indexOf('--port');

if (!process.argv[portIndex + 1]) throw new Error('please provide db port');

server.listen(process.argv[portIndex + 1], () => {
  console.log('db server running!!', process.argv[portIndex + 1]);
});
