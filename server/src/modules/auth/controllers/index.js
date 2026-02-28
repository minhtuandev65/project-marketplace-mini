import { forgotPassword } from './forgotPassword/forgotPassword.controller'
import { login } from './login/login.controller'
import { logout } from './logout/logout.controller'
import { refreshToken } from './refreshToken/refreshToken.controller'
import { register } from './register/register.controller'
import { resetPassword } from './resetPassword/resetPassword.controller'
import { verifyEmail } from './verify/verify.email.controller'

export const controllersAuth = {
    register,
    login,
    verifyEmail,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword
}
