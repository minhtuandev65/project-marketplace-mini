import { INDEX_NAME } from '~/shared/utils/constants'
import { elasticClient } from './elasticsearch.client'

export const indexShop = async (shop) => {
    try {
        await elasticClient.index({
            index: INDEX_NAME.SHOPS,
            id: shop._id.toString(),
            document: {
                shopId: shop._id,
                name: shop.shopName,
                description: shop.description,
                address: shop.address,
                status: shop.status,
                createdAt: shop.createdAt
            }
        })
    } catch (error) {
        throw new Error('[Elastic Shop Index Error] ' + error.message)
    }
}
