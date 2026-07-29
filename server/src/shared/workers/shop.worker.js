import { Worker } from 'bullmq'
import IORedis from 'ioredis'
import { indexShop } from '~/shared/providers/elasticsearch/elasticsearch.shop.service'
import { shopRepository } from '~/modules/shops/repositories/shop.repository'

const connection = new IORedis()

export const shopWorker = new Worker(
    'shopQueue',
    async (job) => {
        if (job.name === 'SHOP_APPROVED') {
            const shop = await shopRepository.findById(job.data.shopId)

            if (!shop) return

            if (shop.status !== 'APPROVED') return

            await indexShop(shop)
        }
    },
    { connection }
)
