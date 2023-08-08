import express from 'express'
import { config } from 'dotenv'
import router from '~/routes/index.routes'
import mongoose from 'mongoose'
import http from 'http'
config()

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/v1', router)

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log(`📢MongoDB is connected!`)
    server.listen(port, () => console.log(`🚀Server is running on port ${port}`))
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB`, error)
    process.exit(1)
  })
