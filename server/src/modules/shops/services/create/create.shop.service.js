import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/shared/utils/ApiError'
import { repositoriesUsers } from '../../repositories/seller.repositories'
import { ROLE } from '~/shared/utils/constants'
import { indexShop } from '~/shared/providers/elasticsearch/elasticsearch.shop.service'

export const createShop = async (reqData) => {
    try {
        const user = await repositoriesUsers.findUserById(
            String(reqData.ownerId)
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

        const result = await repositoriesUsers.registerSeller(reqData)

        return {
            _id: result.insertedId,
            email: reqData.email,
            shopName: reqData.shopName,
            address: reqData.address,
            phoneNumber: reqData.phoneNumber,
            logo: reqData.logo,
            banner: reqData.banner,
            description: reqData.description,
            status: reqData.status
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
