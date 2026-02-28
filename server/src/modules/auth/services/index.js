import { forgotPassword } from './forgotPassword/forgotPassword.service'
import { login } from './login/login.service'
import { logout } from './logout/logout.service'
import { refreshToken } from './refreshToken/refreshToken.service'
import { register } from './register/register.service'
import { resetPassword } from './resetPassword/resetPassword.service'
import { verifyEmail } from './verify/verify.email.service'

export const servicesAuth = {
    register,
    login,
    verifyEmail,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword
}
