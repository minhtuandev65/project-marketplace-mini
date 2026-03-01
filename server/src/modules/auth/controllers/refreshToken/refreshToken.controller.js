import { StatusCodes } from 'http-status-codes'
import { servicesAuth } from '../../services'
import ApiError from '~/shared/utils/ApiError'
import { REFRESHTOKEN_SCHEMA } from '../../validators/auth.refreshToken.schema'
import UAParser from 'ua-parser-js'
import { env } from '~/config/env/environment'
import ms from 'ms'
import Joi from 'joi'

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        const parser = new UAParser(req.headers['user-agent'])
        const ua = parser.getResult()
        const deviceInfo = {
            browser: ua.browser.name,
            os: ua.os.name,
            device: ua.device.type || 'desktop'
        }
        const dataRefreshToken = {
            ...deviceInfo,
            ipAddress: req.ip
        }
        const payload = await REFRESHTOKEN_SCHEMA.validateAsync(
            { refreshToken },
            { abortEarly: false, stripUnknown: true }
        )

        const result = await servicesAuth.refreshToken(
            payload.refreshToken,
            dataRefreshToken
        )

        const isProduction = env.BUILD_MODE === 'production'

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'lax',
            maxAge: ms('2 days')
        })

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: req.t('auth.refresh_token.successfully'),
            data: result.accessToken
        })
    } catch (error) {
        const { t } = req
        if (error instanceof Joi.ValidationError) {
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                error.details.map((d) => d.message)
            )
        }
        if (error instanceof ApiError) {
            const message = Array.isArray(error.message)
                ? error.message.map((key) => t(key))
                : t(error.message)

            return res.status(error.statusCode).json({
                status: 'error',
                message
            })
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: t('auth.refresh_token.failed')
        })
    }
}
