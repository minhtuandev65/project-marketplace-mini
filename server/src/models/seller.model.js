import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const SELLER_COLLECTION = 'sellers'
export const getSellerCollection = () => GET_DB().collection(SELLER_COLLECTION)
