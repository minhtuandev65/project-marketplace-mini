import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/shared/utils/ApiError'
import { repositoriesSeller } from '../../repositories/seller.repositories'
import { ROLE } from '~/shared/utils/constants'

export const registerSeller = async (reqData) => {
    try {
        const user = await repositoriesSeller.findUserById(
            String(reqData.user_id)
        )
        if (!user) {
            throw new ApiError(
                StatusCodes.NOT_ACCEPTABLE,
                'sellers.register_seller.not_active'
            )
        }
        if (user.role === ROLE.SELLER) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                'sellers.register_seller.already_seller'
            )
        }

        const result = await repositoriesSeller.registerSeller(reqData)

        return {
            _id: result.insertedId
        }
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
