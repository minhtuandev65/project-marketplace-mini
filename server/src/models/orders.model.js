import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const ORDERS_COLLECTION = 'orders'

export const getOrdersCollection = () => GET_DB().collection(ORDERS_COLLECTION)
