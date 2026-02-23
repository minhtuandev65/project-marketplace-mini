import { redis } from './redis.client'

export const cacheService = {
    async get(key) {
        const data = await redis.get(key)
        return data ? JSON.parse(data) : null
    },

    async set(key, value, ttl = 300) {
        await redis.set(key, JSON.stringify(value), { EX: ttl })
    },

    async del(key) {
        await redis.del(key)
    },

    async delByPrefix(prefix) {
        const stream = redis.scanStream({
            match: `${prefix}*`
        })

        for await (const keys of stream) {
            if (keys.length) {
                await redis.del(keys)
            }
        }
    }
}
