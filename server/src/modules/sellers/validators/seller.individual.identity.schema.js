import Joi from 'joi'
import {
    ID_NUMBER_RULE,
    ID_NUMBER_RULE_MESSAGE,
    NAME_RULE,
    NAME_RULE_MESSAGE,
    TAX_CODE_RULE,
    TAX_CODE_RULE_MESSAGE
} from '~/shared/validations/validators'

export const INDIVIDUAL_IDENTITY_SCHEMA = Joi.object({
    full_name: Joi.string()
        .trim()
        .strict()
        .pattern(NAME_RULE)
        .required()
        .messages({
            'any.required':
                'schema.sellers.individual_identity.full_name.required',
            'string.pattern.base': NAME_RULE_MESSAGE
        }),

    id_number: Joi.string().pattern(ID_NUMBER_RULE).required().messages({
        'any.required': 'schema.sellers.individual_identity.id_number.required',
        'string.pattern.base': ID_NUMBER_RULE_MESSAGE
    }),

    id_card_images: Joi.array()
        .items(
            Joi.string().uri().required().messages({
                'string.uri':
                    'schema.sellers.individual_identity.id_card_images.invalid_url'
            })
        )
        .min(2)
        .max(2)
        .required()
        .messages({
            'any.required':
                'schema.sellers.individual_identity.id_card_images.required',
            'array.min':
                'schema.sellers.individual_identity.id_card_images.min',
            'array.max': 'schema.sellers.individual_identity.id_card_images.max'
        }),
    tax_code: Joi.string()
        .pattern(TAX_CODE_RULE)
        .required()
        .allow(null, '')
        .messages({
            'any.required':
                'schema.sellers.individual_identity.tax_code.required',
            'string.pattern.base': TAX_CODE_RULE_MESSAGE
        })
})
