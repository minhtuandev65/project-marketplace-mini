import { ObjectId } from 'mongodb'
import { getRefreshTokensCollection } from '~/models/refreshToken.model'

const deleteAllRefreshTokensByUserId = async (id) => {
    return await getRefreshTokensCollection().deleteOne({
        _id: new ObjectId(id)
    })
}

const insertRefreshToken = async (data, id) => {
    return await getRefreshTokensCollection().insertOne({
        userId: new ObjectId(id),
        createAt: new Date(),
        ...data
    })
}
const findRefreshToken = async (id, jti) => {
    return await getRefreshTokensCollection().findOne(
        {
            userId: new ObjectId(id),
            jti
        },
        { projection: { token: 1, _id: 1, userId: 1, jti: 1 } }
    )
}
const deleteUponDetectionReuse = async (userId, jti) => {
    return await getRefreshTokensCollection().deleteMany({
        userId: new ObjectId(userId),
        jti
    })
}

const logout = async (id, jti) => {
    return await getRefreshTokensCollection().deleteOne({
        userId: new ObjectId(id),
        jti
    })
}
export const refreshTokenRepository = {
    deleteAllRefreshTokensByUserId,
    insertRefreshToken,
    findRefreshToken,
    deleteUponDetectionReuse,
    logout
}
