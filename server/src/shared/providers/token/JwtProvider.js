import { StatusCodes } from 'http-status-codes'
import JWT from 'jsonwebtoken'
import ApiError from '~/shared/utils/ApiError'

const generateToken = async (userInfo, secretKey, expireTime) => {
    try {
        const token = JWT.sign(userInfo, secretKey, {
            algorithm: 'HS256',
            expiresIn: expireTime
        })
        return token
    } catch (error) {
        throw new Error(error)
    }
}

const verifyToken = async (token, secretKey) => {
    try {
        return JWT.verify(token, secretKey)
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired')
        }
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
    }
}

export const JwtProvider = {
    generateToken,
    verifyToken
}
