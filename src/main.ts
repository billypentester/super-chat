import express from 'express';
import { createServer } from 'http';
const app = express();
const server = createServer(app);
import socketConnect from './modules/chat.js';
import mongoConnect from './db/conn.js';
import auth from './routes/auth.js';
import admin from './routes/admin.js'
const port = process.env.PORT || 3000

socketConnect(server)
mongoConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', auth)
app.use('/admin', admin)

server.listen(port, () => console.log(`App listening on port: ${port}`))