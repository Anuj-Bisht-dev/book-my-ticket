import z from "zod";

const registerModel = z.object({
  name: z.string().max(100).trim().min(2),
  email: z.string().lowercase().max(322).trim(),
  password: z.string().min(8).max(66),
});

const verifyEmailModel = z.object({
  token: z.string().trim(),
});

const signInModel = z.object({
  email: z.string().lowercase().trim().max(322),
  password: z.string().min(8).max(66),
});

const refreshTokenModel = z.object({
  token: z.string().trim(),
});

const signOutModel = z.object({
  userId: z.string().trim(),
});

const forgotPasswordModel = z.object({
  email: z.string().lowercase().trim().max(322),
});

const resetPasswordModel = z.object({
  token: z.string().min(6).max(6),
  newPassword: z.string().min(8).max(66),
});

export {
  registerModel,
  verifyEmailModel,
  signInModel,
  signOutModel,
  refreshTokenModel,
  forgotPasswordModel,
  resetPasswordModel,
};
