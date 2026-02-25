import { login } from './login/login.controller'
import { register } from './register/register.controller'
import { verifyEmail } from './verify/verify.email.controller'

export const controllersAuth = {
    register,
    login,
    verifyEmail
}
