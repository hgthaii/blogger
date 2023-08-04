import express from 'express'
import { config } from 'dotenv'
import databaseService from '~/services/database.service'
import defaultErrorHandler from '~/middlewares/error.middleware'
import router from '~/routes/index.routes'
config()

const app = express()
const port = process.env.PORT || 5000
databaseService.connect()

app.use(express.json())
app.use('/api/v1', router)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`🚀Server is running on port ${port}`)
})
