import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const connection = new IORedis()

export const shopQueue = new Queue('shopQueue', {
    connection
})
