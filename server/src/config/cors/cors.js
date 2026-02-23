import { env } from '~/config/env/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/shared/utils/ApiError'
import { WEBSITE_DOMAIN } from '~/shared/utils/constants'

export const corsOptions = {
    origin: function (origin, callback) {
        console.log('🌐 Origin nhận được:', origin)
        console.log('✅ WEBSITE_DOMAIN:', WEBSITE_DOMAIN)
        // Nếu môi trường là local dev thì cho qua luôn
        if (env.BUILD_MODE === 'dev') {
            return callback(null, true)
        }

        console.log(WEBSITE_DOMAIN)
        // Ngược lại thì hiện tại code chúng ta đang làm còn 1 trường hợp là:
        // env.BUILD_MODE === 'production'

        // ✅ Cho phép không có origin (Postman, healthcheck, server-side)
        if (!origin) {
            return callback(null, true)
        }
        // Kiểm tra xem origin có phải là domain được chấp nhận hay không
        if (WEBSITE_DOMAIN.includes(origin)) {
            return callback(null, true)
        }

        // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
        return callback(
            new ApiError(
                StatusCodes.FORBIDDEN,
                `${origin} not allowed by our CORS Policy.`
            )
        )
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // CORS sẽ cho phép nhận cookies từ request
    credentials: true
}
