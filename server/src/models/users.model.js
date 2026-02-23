import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const USER_COLLECTION = 'users'

export const getUserCollection = () => GET_DB().collection(USER_COLLECTION)
