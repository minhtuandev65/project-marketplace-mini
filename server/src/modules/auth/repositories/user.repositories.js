import { ObjectId } from 'mongodb'
import { getUserCollection } from '~/models/users.model'

const findByEmail = async (email) => {
    return await getUserCollection().findOne({
        email,
        _destroy: false
    })
}

const findById = async (id) => {
    return await getUserCollection().findOne({
        _id: new ObjectId(id),
        _destroy: false
    })
}

const create = async (data) => {
    return await getUserCollection().insertOne(data)
}

const softDelete = async (id) => {
    const DELETE_AFTER_DAYS = 24 * 60 * 60 * 1000
    return await getUserCollection().updateOne(
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
    return await getUserCollection().deleteMany({
        _destroy: true,
        deleteAt: { $lte: new Date() }
    })
}

export const userRepository = {
    findByEmail,
    findById,
    create,
    softDelete,
    hardDeleteExpired
}
