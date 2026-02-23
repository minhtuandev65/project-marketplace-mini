import { ObjectId } from 'mongodb'
import { getShopsCollection } from '~/models/shops.model'
// tạo match và đếm tổng dựa điều kiện
const buildMatchStage = (filtersMatch = {}) => {
    return {
        _destroy: false,
        ...filtersMatch
    }
}

const countByCondition = async (matchStage) => {
    const pipeline = [{ $match: matchStage }, { $count: 'total' }]

    const [result] = await getShopsCollection().aggregate(pipeline).toArray()

    return result?.total || 0
}
// lấy danh sách dự án với phân trang
const findList = async ({ matchStage, skip, limit }) => {
    const pipeline = [
        { $match: matchStage },
        {
            $project: {
                title: 1,
                shortDescription: 1,
                thumbnail: 1,
                techStack: 1
            }
        },
        { $skip: skip },
        { $limit: parseInt(limit) }
    ]
    return await getShopsCollection().aggregate(pipeline).toArray()
}
// tìm kiếm theo điều kiện
const findById = async (id) => {
    return await getShopsCollection().findOne({ _id: id })
}
const findBySlug = async (slug) => {
    return await getShopsCollection().findOne({
        slug,
        _destroy: false
    })
}

const create = async (data) => {
    return await getShopsCollection().insertOne(data)
}

const updateById = async ({ id, data }) => {
    return await getShopsCollection().findOneAndUpdate(
        { _id: new ObjectId(id), _destroy: false },
        {
            $set: {
                ...data
            }
        },
        { returnDocument: 'after' }
    )
}

const softDelete = async (id) => {
    const DELETE_AFTER_DAYS = 24 * 60 * 60 * 1000
    return await getShopsCollection().updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                _destroy: true,
                deletedAt: new Date(),
                deleteAt: new Date(Date.now() + DELETE_AFTER_DAYS)
            }
        }
    )
}

const hardDeleteExpired = async () => {
    return await getShopsCollection().deleteMany({
        _destroy: true,
        deleteAt: { $lte: new Date() }
    })
}

export const projectsRepository = {
    buildMatchStage,
    countByCondition,
    findById,
    findBySlug,
    create,
    updateById,
    softDelete,
    hardDeleteExpired,
    findList
}
