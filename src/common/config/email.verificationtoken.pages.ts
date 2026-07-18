export const emailVerificationFormatPages = (
  name: string,
  verificationToken: string,
  route: string
) => {
  return ` <!DOCTYPE html> 
  <html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

          <tr>
            <td align="center"
              style="background:#2563eb;color:#ffffff;padding:30px;font-size:28px;font-weight:bold;">
              Welcome!
            </td>
          </tr>

          <tr>
            <td style="padding:40px;color:#333333;line-height:1.7;">

              <h2 style="margin-top:0;">
                Hi ${name},
              </h2>

              <p>
                Thank you for creating an account.
              </p>

              <p>
                To complete your registration, please verify your email address
                by clicking the button below.
              </p>

              <div style="text-align:center;margin:40px 0;">
                <a href="${route}${verificationToken}"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:16px 32px;
                    border-radius:8px;
                    font-size:16px;
                    font-weight:bold;">
                  Verify Here
                </a>
              </div>

              <p>
                If the button doesn't work, copy and paste this link into your browser:
              </p>

              <p style="word-break:break-all;color:#2563eb;">
${route}${verificationToken}
              </p>

              <p>
                This verification link will expire in
                <strong>15 minutes</strong>.
              </p>

              <p>
                If you didn't create an account, you can safely ignore this email.
              </p>

              <p style="margin-top:40px;">
                Best regards,<br>
                <strong>Wizard Authentication</strong>
              </p>

            </td>
          </tr>

          <tr>
            <td
              style="background:#f8f8f8;padding:20px;text-align:center;font-size:13px;color:#777777;">
              © 2026 My Cinema Ticket. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
};
