import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const CARTS_COLLECTION = 'carts'

export const getCartsCollection = () =>
    GET_DB().collection(CARTS_COLLECTION)