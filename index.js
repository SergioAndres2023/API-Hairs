import express from 'express';
import cors from 'cors';
import './database.js';
import router from './src/api/router.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors({ origin: true }));
server.use(router);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
