import { ObjectId } from 'mongodb'
import { getUserCollection } from '~/models/users.model'

const baseFilter = { _destroy: false }
const now = new Date()

/* Dùng cho đăng nhập */
const findAccountForLogin = async (email) => {
    return await getUserCollection().findOne(
        { email, ...baseFilter },
        {
            projection: {
                _id: 1,
                role: 1,
                isActive: 1,
                fullName: 1,
                password: 1
            }
        }
    )
}
/* Kiểm tra tồn tại không trả về document */
const existsEmail = async (email) => {
    return (
        (await getUserCollection().countDocuments(
            { email, ...baseFilter, isActive: true },
            { limit: 1 }
        )) > 0
    )
}
/* Dùng để kiểm tra verify email */
const findAccountVerified = async (email) => {
    return await getUserCollection().findOne(
        { email, ...baseFilter, isActive: false },
        {
            projection: {
                isActive: 1,
                verifyToken: 1
            }
        }
    )
}
/* Dùng để cập nhật thông tin đã verify email */
const updateVerified = async (email) => {
    return await getUserCollection().updateOne(
        { email, ...baseFilter },
        {
            $set: {
                isActive: true,
                latestActiveAt: now,
                updatedAt: now
            },
            $unset: { verifyToken: '' }
        }
    )
}
/* Dùng cho việc lấy thông tin cá nhân user */
const findById = async (id) => {
    return await getUserCollection().findOne(
        {
            _id: new ObjectId(id),
            ...baseFilter
        },
        { projection: { password: 0 } }
    )
}

const create = async (data) => {
    return await getUserCollection().insertOne(data)
}

const softDelete = async (id) => {
    const DELETE_AFTER_DAYS = 24 * 60 * 60 * 1000
    return await getUserCollection().updateOne(
        { _id: new ObjectId(id), ...baseFilter },
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
    return await getUserCollection().deleteMany({
        _destroy: true,
        deleteAt: { $lte: new Date() }
    })
}

export const userRepository = {
    findAccountForLogin,
    existsEmail,
    findAccountVerified,
    findById,
    create,
    softDelete,
    hardDeleteExpired,
    updateVerified
}
