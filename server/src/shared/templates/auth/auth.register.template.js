import { APP_ICON_LOGO } from '~/shared/utils/constants'

export const verifyEmailTemplate = ({ fullName, verificationLink }) => {
    return `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
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
            /* Header sử dụng Table thay vì Flexbox để tương thích email */
            .header {
                background-color: #eb6118;
                padding: 25px 30px;
            }
            .header-table {
                width: auto;
                margin: 0 auto; /* Căn giữa toàn bộ cụm logo + chữ */
                border-collapse: collapse;
            }
            .header-table td {
                vertical-align: middle;
            }
            .header h2 {
                color: #000000ff;
                margin: 0;
                font-size: 24px;
                padding-left: 10px; /* Thay thế cho gap */
            }
            .header img {
                display: block;
                height: auto;
            }
            /* Nội dung */
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
                    <table class="header-table" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <img src="${APP_ICON_LOGO}" alt="MT Logo" width="40" style="border:0; outline:none; text-decoration:none;" />
                            </td>
                            <td>
                                <h2>MT-Marketplace</h2>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="content">
                    <h2 style="color: #333333;">Welcome to MT-Marketplace!</h2>
                    <p>Hi <strong>${fullName}</strong>,</p>
                    <p>
                        Thank you for creating an account with us. Please
                        confirm your email address by clicking the button below:
                    </p>
                    <div class="button-container">
                        <a href="${verificationLink}" class="button">Verify Your Email</a>
                    </div>
                    <p>
                        If the button doesn't work, copy and paste this URL into
                        your browser:
                    </p>
                    <p style="word-break: break-all; font-size: 14px;">
                        <a href="${verificationLink}" style="color: #eb6118;">${verificationLink}</a>
                    </p>
                </div>

                <div class="footer">
                    <p>If you didn’t create this account, you can safely ignore this email.</p>
                </div>
            </div>
        </div>
    </body>
</html>
    `
}
