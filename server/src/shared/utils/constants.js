/**
 *
 *
 *
 * "Nơi lưu trữ các trạng thái, hằng số, biến toàn cục dùng chung trong ứng dụng"
 */

import { env } from '~/config/env/environment'

export const WEBSITE_DOMAIN =
    env.BUILD_MODE === 'production'
        ? env.WEBSITE_DOMAIN_PRODUCTION
        : env.WEBSITE_DOMAIN_DEVELOPMENT
export const APP_ICON_LOGO =
    'https://project-marketplace-mini.s3.us-east-1.amazonaws.com/server-logo/icon-logo.png'

export const ROLE = {
    ADMIN: 1,
    SELLER: 2,
    BUYER: 3
}
export const ORDER_STATUS = {
    PENDING: 1,
    PAID: 2,
    SHIPPING: 3,
    COMPLETED: 4,
    CANCELLED: 5
}
