import Joi from 'joi'
import { SELLER_TYPE } from '~/shared/utils/constants'
import { INDIVIDUAL_IDENTITY_SCHEMA } from './seller.individual.identity.schema'
import { BUSINESS_IDENTITY_SCHEMA } from './seller.business.schema'

export const IDENTITY_INFO_SCHEMA = Joi.alternatives().conditional(
    'seller_type',
    [
        {
            is: SELLER_TYPE.INDIVIDUAL,
            then: INDIVIDUAL_IDENTITY_SCHEMA.required()
        },
        {
            is: SELLER_TYPE.BUSINESS,
            then: BUSINESS_IDENTITY_SCHEMA.required()
        }
    ]
)
