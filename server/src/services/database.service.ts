import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/user.schema'
import RefreshToken from '~/models/schemas/refreshToken.schema'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blogger.st1i9qr.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db('blogger')
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('📂MongoDB is connected!')
    } catch (error) {
      console.dir(error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh_tokens')
  }

  get blogs(): Collection<any> {
    return this.db.collection('blogs')
  }
}

const databaseService = new DatabaseService()

export default databaseService
