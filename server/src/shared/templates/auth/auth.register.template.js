import { APP_LOGO } from "~/shared/utils/constants"

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
            .header {
                background-color: #eb6118;
                padding: 30px;
                text-align: center;
            }
            .header img {
                max-width: 180px;
                height: auto;
                display: inline-block;
            }
            .content {
                padding: 30px;
                color: #333333;
                font-size: 16px;
                line-height: 1.6;
            }
            h2 {
                color: #333333;
                margin-top: 0;
            }
            p {
                font-size: 16px;
                color: #555555;
                line-height: 1.6;
                margin-bottom: 15px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                margin-top: 20px;
                background-color: #000000;
                color: #ffffff;
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
                <!-- Header với logo -->
                <div class="header">
                    <img src=${APP_LOGO} alt="Foodiehub-qt Logo" />
                </div>

                <!-- Content -->
                <div class="content">
                    <h2>Welcome to FoodieHub-qt!</h2>
                    <p>Hi <strong>${fullName}</strong>,</p>
                    <p>
                        Thank you for creating an account with us. Please
                        confirm your email address by clicking the button below:
                    </p>
                    <a href="${verificationLink}" class="button"
                        >Verify Your Email</a
                    >
                    <p>
                        If the button doesn't work, copy and paste this URL into
                        your browser:
                    </p>
                    <p style="word-break: break-all">
                        <a href="${verificationLink}">${verificationLink}</a>
                    </p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <p>
                        If you didn’t create this account, you can safely ignore
                        this email.
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>

  `
}
