import { ObjectId } from 'mongodb'
import { getUserCollection } from '~/models/users.model'

const baseFilter = { _destroy: false }

/* Dùng cho đăng nhập */
const findUserForLogin = async (email) => {
    return await getUserCollection().findOne(
        { email, ...baseFilter },
        {
            projection: {
                _id: 1,
                email: 1,
                role: 1,
                isActive: 1,
                fullName: 1,
                password: 1
            }
        }
    )
}
/* Dùng để kiểm tra verify email */
const findAccountVerified = async (email) => {
    const exist = await getUserCollection().findOne(
        { email, ...baseFilter, isActive: true },
        {
            projection: {
                _id: 1
            }
        }
    )
    return !!exist
}
/* Dùng để kiểm tra tài khoản quên mật khẩu */
const findAccountForgotPassword = async (email) => {
    return await getUserCollection().findOne(
        { email, ...baseFilter },
        {
            projection: {
                _id: 1,
                resetPasswordExpireAt: 1,
                resetPasswordRequestedAt: 1
            }
        }
    )
}
const updateTokenForgotPassword = async (id, token) => {
    return await getUserCollection().updateOne(
        { _id: new ObjectId(id), ...baseFilter },
        {
            $set: {
                resetPasswordToken: token,
                resetPasswordExpireAt: Date.now() + 15 * 60 * 1000,
                resetPasswordRequestedAt: Date.now()
            }
        }
    )
}
/* reset password */
const updatePassword = async (data) => {
    return await getUserCollection().findOneAndUpdate(
        {
            ...baseFilter,
            resetPasswordToken: data?.token,
            resetPasswordExpireAt: { $gt: Date.now() }
        },
        {
            $set: {
                password: data?.newPassword,
                updatedAt: new Date()
            },
            $unset: {
                resetPasswordToken: '',
                resetPasswordExpireAt: '',
                resetPasswordRequestedAt: ''
            }
        },
        {
            projection: {
                _id: 1
            },
            returnDocument: 'after'
        }
    )
}
/* Dùng để cập nhật thông tin đã verify email */
const updateVerified = async (reqData) => {
    const { email, token } = reqData
    return await getUserCollection().updateOne(
        { email, ...baseFilter, verifyToken: token, isActive: false },
        {
            $set: {
                isActive: true,
                latestActiveAt: new Date(),
                updatedAt: new Date()
            },
            $unset: { verifyToken: '' }
        }
    )
}
/* Dùng cho việc lấy thông tin cá nhân user */
const findById = async (id) => {
    return await getUserCollection().findOne(
        {
            _id: new ObjectId(id),
            ...baseFilter,
            isActive: true
        },
        { projection: { password: 0 } }
    )
}

const create = async (data) => {
    return await getUserCollection().insertOne(data)
}

const softDelete = async (id) => {
    const DELETE_AFTER_DAYS = 24 * 60 * 60 * 1000
    return await getUserCollection().updateOne(
        { _id: new ObjectId(id), ...baseFilter },
        {
            $set: {
                _destroy: true,
                deletedAt: new Date(),
                deleteAt: new Date(Date.now() + DELETE_AFTER_DAYS)
            }
        }
    )
}

const hardDeleteExpired = async () => {
    return await getUserCollection().deleteMany({
        _destroy: true,
        deleteAt: { $lte: new Date() }
    })
}

export const authRepository = {
    findUserForLogin,
    findAccountVerified,
    findById,
    create,
    softDelete,
    hardDeleteExpired,
    updateVerified,
    findAccountForgotPassword,
    updateTokenForgotPassword,
    updatePassword
}
