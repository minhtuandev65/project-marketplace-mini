import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '../env/environment'

let jobSeekDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true
    }
    // tls: true,
    // tlsAllowInvalidCertificates: true
})

export const CONNECT_DB = async () => {
    try {
        console.log('🔵 MongoDB connecting...')

        await mongoClientInstance.connect()
        jobSeekDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)

        const usersCollection = jobSeekDatabaseInstance.collection('users')

        // Unique index email
        await usersCollection.createIndex({ email: 1 }, { unique: true })

        console.log('🟢 MongoDB connected successfully')
    } catch (error) {
        console.error('🔴 MongoDB connection failed:', error)
        process.exit(1)
    }
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}

export const GET_DB = () => {
    if (!jobSeekDatabaseInstance) {
        throw new Error('❌ Must connect to MongoDB first.')
    }
    return jobSeekDatabaseInstance
}
