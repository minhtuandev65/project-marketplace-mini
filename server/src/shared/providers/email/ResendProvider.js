import { env } from '~/config/env/environment'

const { Resend } = require('resend')

let resendInstance = new Resend(env.RESEND_API_KEY)

export const setResendInstance = (instance) => {
    resendInstance = instance
}

const sendMail = async (recipientMail, customSubject, htmlContent) => {
    try {
        const result = await resendInstance.emails.send({
            from: 'noreply@reniwdev.uk',
            to: recipientMail,
            subject: customSubject,
            html: htmlContent
        })
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export const ResendProvider = {
    sendMail
}
