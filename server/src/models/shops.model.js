import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const SHOPS_COLLECTION = 'shops'

export const getShopsCollection = () =>
    GET_DB().collection(SHOPS_COLLECTION)
