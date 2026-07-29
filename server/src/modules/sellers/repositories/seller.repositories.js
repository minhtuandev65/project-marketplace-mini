import { ObjectId } from 'mongodb'
import { getSellerCollection } from '~/models/seller.model'
import { getUserCollection } from '~/models/users.model'

// tìm kiếm người dùng theo email
const findUserById = async (id) => {
    return await getUserCollection().findOne(
        {
            _id: new ObjectId(id),
            _destroy: false,
            isActive: true
        },
        {
            projection: {
                _id: 1,
                role: 1
            }
        }
    )
}
const registerSeller = async (data) => {
    return await getSellerCollection().insertOne({
        ...data,
        user_id: new ObjectId(data.user_id)
    })
}

export const repositoriesSeller = {
    findUserById,
    registerSeller
}
