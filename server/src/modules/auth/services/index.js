import { login } from './login/login.service'
import { refreshToken } from './refreshToken/refreshToken.service'
import { register } from './register/register.service'
import { verifyEmail } from './verify/verify.email.service'

export const servicesAuth = {
    register,
    login,
    verifyEmail,
    refreshToken
}
