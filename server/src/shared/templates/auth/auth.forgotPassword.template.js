import { env } from '~/config/env/environment'
import { APP_ICON_LOGO } from '~/shared/utils/constants'

export const forgotPasswordTemplate = (fullName, confirmationLink) => {
    return `
    <!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-wrapper {
                width: 100%;
                padding: 20px 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #eb6118;
                padding: 25px 30px;
            }
            .header-table {
                width: auto;
                margin: 0 auto;
                border-collapse: collapse;
            }
            .header-table td {
                vertical-align: middle;
            }
            .header h2 {
                color: #000000;
                margin: 0;
                font-size: 24px;
                padding-left: 10px;
            }
            .header img {
                display: block;
                height: auto;
            }
            .content {
                padding: 30px;
                color: #333333;
                font-size: 16px;
                line-height: 1.6;
            }
            .button-container {
                text-align: center;
                padding: 20px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #000000;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                background-color: #fafafa;
                padding: 20px;
                text-align: center;
                font-size: 13px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="container">
                <div class="header">
                    <table
                        class="header-table"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                    >
                        <tr>
                            <td>
                                <img
                                    src="${APP_ICON_LOGO}"
                                    alt="MT Logo"
                                    width="40"
                                    style="
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                    "
                                />
                            </td>
                            <td>
                                <h2>MT-Marketplace</h2>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="content">
                    <h2 style="color: #333333">Password Reset Request</h2>
                    <p>Hi <strong>${fullName}</strong>,</p>
                    <p>
                        We received a request to reset the password for your
                        MT-Marketplace account. Click the button below to choose
                        a new password:
                    </p>
                    <div class="button-container">
                        <a href="${confirmationLink}" class="button"
                            >Reset Password</a
                        >
                    </div>
                    <p style="font-size: 14px; color: #666">
                        <strong>Note:</strong> This link will expire in 1 hour
                        for security reasons.
                    </p>
                </div>

                <div class="footer">
                    <p>
                        If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged. Contact us at ${env.SUPPORT_EMAIl}
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>
  `
}
