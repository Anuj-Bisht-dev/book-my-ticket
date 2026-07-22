import { Resend } from "resend";
import { env } from "./config.env.js";
import { ApiError } from "../utils/api-error.js";
import { emailVerificationFormatPages } from "../email-pages/email.verificationtoken.pages.js";
import { forgotPasswordFormatPages } from "../email-pages/email.forgotpasswordtoken.pages.js";

const resend = new Resend(env.RESEND_API_KEY);

resend.apiKeys.create({ name: "VerificationTokens" });

export const sendVerificationTokenEmail = async (
  name: string,
  verificationToken: string
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "anujbisht352@gmail.com",
    subject: `verification token for user ${name}`,
    html: emailVerificationFormatPages(
      name,
      verificationToken,
      "http://localhost:8080/api/auth/verify-email/"
    ),
  });

  if (error) throw ApiError.serverNotResponding(`${error}`);
};

export const sendVerificationTokenForgotPassword = async (
  name: string,
  verificationToken: string
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "anujbisht352@gmail.com",
    subject: `verification token for user ${name}`,
    html: forgotPasswordFormatPages(name, verificationToken),
  });

  if (error) throw ApiError.serverNotResponding(`${error}`);
};
