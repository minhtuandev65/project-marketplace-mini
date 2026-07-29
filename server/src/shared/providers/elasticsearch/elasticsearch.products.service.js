import { INDEX_NAME } from '~/shared/utils/constants'
import { elasticClient } from './elasticsearch.client'

export const indexProduct = async (product) => {
    try {
        await elasticClient.index({
            index: INDEX_NAME.PRODUCTS,
            id: product._id.toString(),
            document: {
                productId: product._id.toString(),

                name: product.name,
                description: product.description,

                nameShop: product.nameShop,
                descriptionShop: product.descriptionShop,

                category: product.category,

                price: product.price,
                rating: product.rating || 0,

                status: product.status,

                shopId: product.shopId,

                createdAt: product.createdAt
            }
        })
    } catch (error) {
        throw new Error('[Elastic Product Index Error] ' + error.message)
    }
}
