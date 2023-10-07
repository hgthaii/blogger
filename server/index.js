import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './src/routes/index.routes.js'
dotenv.config()

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log(`📢MongoDB is connected!`)
    server.listen(port, () => console.log(`🚀Server is running on port ${port}`))
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB`, error)
    process.exit(1)
  })
