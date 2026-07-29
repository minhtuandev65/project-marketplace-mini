import { elasticClient } from '~/shared/providers/elasticsearch/elasticsearch.client'
import { INDEX_NAME } from '~/shared/utils/constants'

export const searchProducts = async (
    keyword,
    filters = {},
    page = 1,
    limit = 10
) => {
    const must = []

    // search keyword
    if (keyword) {
        must.push({
            multi_match: {
                query: keyword,
                fields: ['name^3', 'nameShop^2', 'description']
            }
        })
    }

    // filter category
    if (filters.category) {
        must.push({
            term: { category: filters.category }
        })
    }

    // filter status
    must.push({
        term: { status: 'active' }
    })

    // filter price
    if (filters.minPrice || filters.maxPrice) {
        const range = {}

        if (filters.minPrice) range.gte = filters.minPrice
        if (filters.maxPrice) range.lte = filters.maxPrice

        must.push({
            range: { price: range }
        })
    }

    const result = await elasticClient.search({
        index: INDEX_NAME.PRODUCTS,

        from: (page - 1) * limit,
        size: limit,

        query: {
            bool: { must }
        },

        sort: [{ rating: 'desc' }, { createdAt: 'desc' }]
    })

    return {
        total: result.hits.total.value,
        page,
        limit,
        products: result.hits.hits.map((hit) => hit._source)
    }
}
