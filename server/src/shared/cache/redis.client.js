import { getRedisClient } from '~/config/redis/redis'

export const redis = {
    get: async (key) => {
        return getRedisClient().get(key)
    },

    set: async (key, value, options) => {
        return getRedisClient().set(key, value, options)
    },

    del: async (key) => {
        return getRedisClient().del(key)
    }
}
