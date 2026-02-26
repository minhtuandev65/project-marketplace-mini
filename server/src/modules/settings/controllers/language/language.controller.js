import { StatusCodes } from 'http-status-codes'

export const changeLanguage = (req, res) => {
    const { lng } = req.body

    req.i18n.changeLanguage(lng)

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: req.i18n.t('settings.language_changed', { lng })
    })
}
