import { GET_DB } from '~/config/mongodb/mongodb.connect'

export const PAYMENTS_COLLECTION = 'payments'

export const getPaymentsCollection = () =>
    GET_DB().collection(PAYMENTS_COLLECTION)