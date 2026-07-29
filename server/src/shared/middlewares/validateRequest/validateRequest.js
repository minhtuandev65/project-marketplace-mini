import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/shared/utils/ApiError'

export const validateRequest =
    ({ params, body, query, cookies } = {}) =>
    async (req, res, next) => {
        try {
            const validated = {}
            if (params) {
                validated.params = await params.validateAsync(req.params, {
                    abortEarly: false,
                    stripUnknown: true
                })
            }
            if (body) {
                validated.body = await body.validateAsync(req.body, {
                    abortEarly: false,
                    stripUnknown: true
                })
            }
            if (query) {
                validated.query = await query.validateAsync(req.query, {
                    abortEarly: false,
                    stripUnknown: true
                })
            }
            if (cookies) {
                validated.cookies = await cookies.validateAsync(req.cookies, {
                    abortEarly: false,
                    stripUnknown: true
                })
            }
            req.validated = validated
            next()
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                return next(
                    new ApiError(
                        StatusCodes.BAD_REQUEST,
                        error.details.map((item) => item.message)
                    )
                )
            }

            next(error)
        }
    }
