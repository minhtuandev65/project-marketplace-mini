import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const PRODUCTS_COLLECTION = 'products'

export const getProductsCollection = () =>
    GET_DB().collection(PRODUCTS_COLLECTION)