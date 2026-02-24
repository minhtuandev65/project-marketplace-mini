import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { userRepository } from '../../repositories/user.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { REGISTER_SCHEMA } from '../../validators/user.register.schema'
import { USER_COLLECTION_SCHEMA } from '../../validators/user.collection.schema'
import { WEBSITE_DOMAIN } from '~/shared/utils/constants'
import { ResendProvider } from '~/shared/providers/email/ResendProvider'
import { templates } from '~/shared/templates'

export const register = async (reqData) => {
    try {
        const payload = await REGISTER_SCHEMA.validateAsync(reqData, {
            abortEarly: false
        })

        const rawUserData = {
            email: payload.email,
            password: await bcrypt.hash(payload.password, 8),
            username: payload.email.split('@')[0],
            fullName: payload.fullName ?? null,
            verifyToken: uuidv4()
        }

        const userData = await USER_COLLECTION_SCHEMA.validateAsync(
            rawUserData,
            { abortEarly: false }
        )

        const result = await userRepository.create(userData)
        const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${userData.email}&token=${userData.verifyToken}`
        const customSubject =
            'MT-Marketplace system: Please verify your email before using our services!'
        const htmlContent = templates.verifyEmailTemplate({
            fullName: userData.fullName,
            verificationLink: verificationLink
        })

        setImmediate(async () => {
            try {
                await ResendProvider.sendMail(
                    userData.email,
                    customSubject,
                    htmlContent
                )
            } catch (err) {
                console.error('Send mail error:', err)
            }
        })
        return {
            data: {
                _id: result.insertedId,
                email: userData.email,
                fullName: userData.fullName
            }
        }
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                'auth.register.email_exist'
            )
        }

        if (error instanceof Joi.ValidationError) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.details.map((d) => d.message)
            )
        }

        throw error
    }
}
