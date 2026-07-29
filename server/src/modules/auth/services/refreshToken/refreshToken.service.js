import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { env } from '~/config/env/environment'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import ApiError from '~/shared/utils/ApiError'
import bcrypt from 'bcryptjs'
import { refreshTokenRepository } from '../../repositories/refreshToken.repositories'
import { authRepository } from '../../repositories/auth.repositories'

export const refreshToken = async (
    refreshTokenFromCookie,
    dataRefreshToken
) => {
    try {
        // Bước 01: Giải mã token lấy ra payload, nếu token không hợp lệ sẽ trả về lỗi
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            refreshTokenFromCookie,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )

        const { jti } = refreshTokenDecoded
        const userId = String(refreshTokenDecoded.userId)
        if (!userId || !jti) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.invalid_token'
            )
        }
        // Bước 02: Tìm token theo userId + jti trong DB, nếu không tìm thấy thì tức là token không hợp lệ

        const tokenDoc = await refreshTokenRepository.findRefreshToken(
            userId,
            jti
        )

        // 🚨 Reuse detection
        if (!tokenDoc) {
            // Token hợp lệ về mặt chữ ký nhưng không tồn tại trong DB
            // Có thể đã bị dùng rồi (reuse attack)
            await refreshTokenRepository.deleteUponDetectionReuse(userId, jti)

            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.reuse_detected'
            )
        }
        // Bước 03: So sánh token gửi lên với token đã được hash trong DB, nếu không khớp thì trả về lỗi
        const isValid = await bcrypt.compare(
            refreshTokenFromCookie,
            tokenDoc.token
        )

        if (!isValid) {
            await refreshTokenRepository.deleteAllRefreshTokensByUserId(userId)
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.invalid_token'
            )
        }
        // Bước 04: Nếu hợp lệ thì tìm user tương ứng với token, nếu không tìm thấy hoặc user đã bị khóa thì trả về lỗi
        const user = await authRepository.findById(userId)

        if (!user || !user.isActive) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                'auth.refresh_token.invalid_token'
            )
        }
        const userInfo = {
            userId: String(user._id),
            email: user.email,
            role: user.role
        }
        // Bước 05: Nếu hợp lệ thì xóa token cũ và tạo mới, lưu vào DB
        await refreshTokenRepository.deleteRefreshTokenById(
            String(tokenDoc._id)
        )

        const newJti = crypto.randomUUID()

        const refreshToken = await JwtProvider.generateToken(
            { userId: String(user._id), jti: newJti },
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
        )

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

        const refreshTokenInfo = {
            ...dataRefreshToken,
            token: hashedRefreshToken,
            jti: newJti
        }

        await refreshTokenRepository.insertRefreshToken(
            refreshTokenInfo,
            String(user._id)
        )

        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )

        return {
            accessToken,
            refreshToken
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
