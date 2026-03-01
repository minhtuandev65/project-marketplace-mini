import { authRepository } from '../../repositories/auth.repositories'
import ApiError from '~/shared/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import crypto from 'crypto'
import { WEBSITE_DOMAIN } from '~/shared/utils/constants'
import { templates } from '~/shared/templates'
import { ResendProvider } from '~/shared/providers/email/ResendProvider'

export const forgotPassword = async (reqData) => {
    try {
        const { email } = reqData

        const account = await authRepository.findAccountForgotPassword(email)
        // Nếu không tìm thấy tài khoản, vẫn trả về thành công để tránh lộ thông tin về sự tồn tại của email
        if (!account) {
            return true
        }
        // chống spam yêu cầu đặt lại mật khẩu, nếu đã yêu cầu trong vòng 2 phút thì không gửi lại email
        if (
            account.resetPasswordRequestedAt &&
            Date.now() - account.resetPasswordRequestedAt < 2 * 60 * 1000
        ) {
            return true
        }

        const rawToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex')

        await authRepository.updateTokenForgotPassword(
            String(account._id),
            hashedToken
        )

        const confirmationLink = `${WEBSITE_DOMAIN}/account/resetPassword?token=${rawToken}`
        const forgotPasswordMailTemplate = templates.forgotPasswordTemplate(
            email,
            confirmationLink
        )

        await ResendProvider.sendMail(
            email,
            'Forgot password confirmation email',
            forgotPasswordMailTemplate
        )
        return true
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
