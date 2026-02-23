import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/env/environment'
import { JwtProvider } from '~/shared/providers/token/JwtProvider'
import ApiError from '~/shared/utils/ApiError'

const isAuthorized = async (req, res, next) => {
    // Lấy token từ cookie trước
    const tokenFromCookie = req.cookies?.accessToken
    // Nếu không có trong cookie thì mới lấy từ header
    const authHeader = req.headers['authorization']
    const tokenFromHeader = authHeader && authHeader.split(' ')[1]

    // Ưu tiên token từ cookie nếu có, nếu không thì lấy token từ header
    const accessToken = tokenFromCookie || tokenFromHeader
    if (!accessToken) {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token not found'))

        return
    }

    try {
        const decodedToken = await JwtProvider.verifyToken(
            accessToken,
            env.ACCESS_TOKEN_SECRET_SIGNATURE
        )
        req.payload = decodedToken

        next()
    } catch (error) {
        if (error?.message?.includes('jwt expired')) {
            next(new ApiError(StatusCodes.GONE, 'Need to refresh token.'))
            return
        }

        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized!'))
    }
}

export const hasRole = (role) => {
    return (req, res, next) => {
        const user = req.payload

        if (user.role != role) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .send({ message: 'Sorry you do not have access' })
        }

        next()
    }
}
export const hasAnyRole = (...roles /* number[] */) => {
    return (req, res, next) => {
        const r = Number(req?.payload?.role) // đảm bảo kiểu số (JWT đôi khi là string)
        if (!roles.includes(r)) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        return next()
    }
}
export default isAuthorized
