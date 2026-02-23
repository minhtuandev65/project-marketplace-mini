import { createClient } from 'redis'
import { env } from '../env/environment'

let redisClient

export const initRedis = async () => {
    redisClient = createClient({
        url: env.REDIS_URL,
        socket: {
            reconnectStrategy: (retries) => Math.min(retries * 100, 3000)
        }
    })

    redisClient.on('connect', () => {
        console.log('🔵 Redis connecting...')
    })

    redisClient.on('ready', () => {
        console.log('🟢 Redis ready')
    })

    redisClient.on('error', (err) => {
        console.error('🔴 Redis error:', err)
    })

    await redisClient.connect()
}

export const getRedisClient = () => {
    if (!redisClient) throw new Error('Redis not initialized')
    return redisClient
}
