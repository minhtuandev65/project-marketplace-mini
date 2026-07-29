import { INDEX_NAME } from '~/shared/utils/constants'
import { elasticClient } from './elasticsearch.client'

const createShopIndex = async () => {
    const exists = await elasticClient.indices.exists({
        index: INDEX_NAME.SHOPS
    })

    if (!exists) {
        await elasticClient.indices.create({
            index: INDEX_NAME.SHOPS,
            mappings: {
                properties: {
                    name: { type: 'text' },
                    description: { type: 'text' },
                    address: { type: 'text' },
                    status: { type: 'keyword' },
                    createdAt: { type: 'date' }
                }
            }
        })
    }
}

const createProductIndex = async () => {
    const exists = await elasticClient.indices.exists({
        index: INDEX_NAME.PRODUCTS
    })

    if (!exists) {
        await elasticClient.indices.create({
            index: INDEX_NAME.PRODUCTS,
            mappings: {
                properties: {
                    name: { type: 'text' },
                    description: { type: 'text' },
                    nameShop: { type: 'text' },
                    descriptionShop: { type: 'text' },

                    category: { type: 'keyword' },

                    price: { type: 'float' },
                    rating: { type: 'float' },

                    shopId: { type: 'keyword' },
                    status: { type: 'keyword' },

                    createdAt: { type: 'date' }
                }
            }
        })
    }
}

export const elasticCreateIndex = {
    createShopIndex,
    createProductIndex
}
