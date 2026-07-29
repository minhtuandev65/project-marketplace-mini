import { getSellerCollection } from '~/models/seller.model'
import { pagingSkipValue } from '~/shared/utils/algorithms'

const listSellers = async (filter = {}) => {
    const { sort, status, page = 1, limit = 30 } = filter
    const skip = pagingSkipValue(page, limit)

    let matchStage = {
        _destroy: false
    }
    const pipeline = [
        { $match: matchStage },
        {
            $project: {
                logoURL: 1,
                name: 1,
                address: 1,
                createdAt: 1,
                status: 1,
                lat: 1,
                lng: 1
            }
        },
        { $skip: skip },
        { $limit: parseInt(limit) }
    ]

    const countPipeline = [{ $match: matchStage }, { $count: 'total' }]

    const [countResult] = await getSellerCollection()
        .aggregate(countPipeline)
        .toArray()

    const total = countResult ? countResult.total : 0

    const sellerList = await getSellerCollection().aggregate(pipeline).toArray()

    return {
        sellerList,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
    }
}

export const repositoriesAdminSeller = {
    listSellers
}
