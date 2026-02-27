import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const REFRESH_TOKENS_COLLECTION = 'refresh_tokens'
let refreshTokenCollection = null
export const getRefreshTokensCollection = () => {
    if (!refreshTokenCollection) {
        refreshTokenCollection = GET_DB().collection(REFRESH_TOKENS_COLLECTION)

        // tạo index một lần khi app start
        refreshTokenCollection.createIndex(
            { userId: 1, jti: 1 },
            { unique: true }
        )
    }

    return refreshTokenCollection
}
