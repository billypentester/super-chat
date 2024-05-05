import express from 'express';
import { createServer } from 'http';
import socketConnect from './modules/chat.js';
import mongoConnect from './db/conn.js';
import auth from './routes/auth.js';
import admin from './routes/admin.js'
import morgan from 'morgan'
import cors from 'cors'

const port = process.env.PORT || 3000
const app = express();
const server = createServer(app);

socketConnect(server)
mongoConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use('/auth', auth)
app.use('/admin', admin)

server.listen(port, () => console.log(`App listening on port: ${port}`))