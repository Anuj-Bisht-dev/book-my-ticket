export const forgotPasswordFormatPages = (
  name: string,
  verificationOtp: string
) => {
  return `html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">
        <table
          role="presentation"
          width="600"
          cellspacing="0"
          cellpadding="0"
          style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);"
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="background:#2563eb;color:#ffffff;padding:30px;font-size:28px;font-weight:bold;"
            >
              My Cinema Ticket
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#333333;">

              <h2 style="margin-top:0;">Reset Your Password</h2>

              <p>Hello <strong>${name}</strong>,</p>

              <p>
                We received a request to reset the password for your account.
              </p>

              <p>
                Your OTP is <center> <h2>${verificationOtp}</h2> </center> This will expire in
                <strong>15 minutes</strong>.
              </p>

              <p>
                If you did not request a password reset, you can safely ignore
                this email. Your password will remain unchanged.
              </p>

              <hr style="border:none;border-top:1px solid #e5e5e5;margin:30px 0;">

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="padding:25px;background:#fafafa;color:#777777;font-size:13px;"
            >
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
