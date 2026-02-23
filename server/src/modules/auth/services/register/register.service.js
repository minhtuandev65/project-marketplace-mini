import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { REGISTER_SCHEMA } from '../../validators/user.register.schema'

export const register = async (reqData) => {
    try {
        const payload = await REGISTER_SCHEMA.validateAsync(reqData, {
            abortEarly: false
        })
        const nameFromEmail = reqData.email.split('@')[0]

        const rawUserData = {
            email: payload.email,
            password: await bcrypt.hash(payload.password, 8),
            username: nameFromEmail,
            fullName: payload.fullName ?? null,
            verifyToken: uuidv4()
        }
        const userData = await USER_COLLECTION_SCHEMA.validateAsync(
            rawUserData,
            { abortEarly: false }
        )
        const existEmail = await userRepository.findByEmail(userData.email)
        if (existEmail) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                'auth.register.email_exist'
            )
        }

        const result = await userRepository.create(userData)
        const user = await userRepository.findById(result.insertedId)

        return { data: user }
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
