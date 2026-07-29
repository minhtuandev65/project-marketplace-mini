import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

export const adminListSeller = async (reqData) => {
    try {
        const 
        return 0
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.details.map((d) => d.message)
            )
        }

        throw error
    }
}
