import Joi from 'joi'
import {
    NAME_RULE,
    NAME_RULE_MESSAGE,
    REPRESENTATIVE_ID_NUMBER_RULE,
    REPRESENTATIVE_ID_NUMBER_RULE_MESSAGE,
    TAX_CODE_RULE,
    TAX_CODE_RULE_MESSAGE
} from '~/shared/validations/validators'

export const BUSINESS_IDENTITY_SCHEMA = Joi.object({
    full_name: Joi.string()
        .trim()
        .strict()
        .pattern(NAME_RULE)
        .required()
        .messages({
            'any.required': 'schema.sellers.business_identity.required',
            'string.pattern.base': NAME_RULE_MESSAGE
        }),
    tax_code: Joi.string()
        .pattern(TAX_CODE_RULE)
        .required()
        .allow(null, '')
        .messages({
            'any.required':
                'schema.sellers.business_identity.tax_code.required',
            'string.pattern.base': TAX_CODE_RULE_MESSAGE
        }),

    business_license_url: Joi.string()
        .uri()
        .required()
        .allow(null, '')
        .messages({
            'any.required':
                'schema.sellers.business_identity.business_license_url.required',
            'string.uri': 'schema.sellers.identity.business_license.invalid_url'
        }),
    representative_name: Joi.string()
        .trim()
        .strict()
        .pattern(NAME_RULE)
        .required()
        .messages({
            'any.required':
                'schema.sellers.business_identity.full_name.required',
            'string.pattern.base': NAME_RULE_MESSAGE
        }), // người đại diện
    representative_id_number: Joi.string()
        .pattern(REPRESENTATIVE_ID_NUMBER_RULE)
        .required()
        .messages({
            'any.required':
                'schema.sellers.business_identity.representative_id_number.required',
            'string.pattern.base': REPRESENTATIVE_ID_NUMBER_RULE_MESSAGE
        })
})
