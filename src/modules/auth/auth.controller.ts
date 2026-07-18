import { Request, Response } from "express";
import * as authService from "./auth.services.js";
import { ApiError } from "../../common/utils/api-error.js";
import { ApiResponse } from "../../common/utils/api-response.js";
import {
  forgotPasswordModel,
  refreshTokenModel,
  registerModel,
  resetPasswordModel,
  signInModel,
  signOutModel,
  verifyEmailModel,
} from "./auth.models.js";

const registerController = async (req: Request, res: Response) => {
  const user = await registerModel.safeParseAsync(req.body);
  if (user.error)
    throw ApiError.badRequest(`invalide user input ${user.error.issues}`);

  const { name, email, password } = user.data;
  const registerService = await authService.register(name, email, password);

  return ApiResponse.created(
    res,
    "user created and verification token sent to user"
  );
};

const verifyEmailController = async (req: Request, res: Response) => {
  const userToken = await verifyEmailModel.safeParseAsync({
    token: req.params.token,
  });
  if (userToken.error)
    throw ApiError.unauthorize(
      `invalide verification token ${userToken.error.message}`
    );

  const { token } = userToken.data;
  await authService.verifyEmail(token);

  return ApiResponse.ok(res, "user email verified");
};

const refreshTokenController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  const userRefreshToken = await refreshTokenModel.safeParseAsync({
    token: refreshToken,
  });
  if (userRefreshToken.error)
    throw ApiError.unauthorize(
      `Refresh token is not valide ${userRefreshToken.error.message}`
    );

  const { token } = userRefreshToken.data;
  const refreshTokenService = await authService.refreshToken(token);

  res.cookie("accessToken", refreshTokenService.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshTokenService.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return ApiResponse.ok(res, "refresh and access token has reset successfully");
};

const signInController = async (req: Request, res: Response) => {
  const user = await signInModel.safeParseAsync(req.body);
  if (user.error) throw ApiError.badRequest("email or password is invalide");

  const { email, password } = user.data;
  const userSigninService = await authService.signIn(email, password);

  res.cookie("accessToken", userSigninService.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", userSigninService.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return ApiResponse.ok(
    res,
    "user logged In successfully",
    userSigninService.updatedResult
  );
};

const signOutController = async (req: Request, res: Response) => {
  const user = await signOutModel.safeParseAsync(req.params);
  if (user.error) throw ApiError.badRequest("invalide request from user");

  const { userId } = user.data;
  await authService.signOut(userId);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return ApiResponse.ok(res, "user logged out successfully");
};

const forgotPasswordController = async (req: Request, res: Response) => {
  const user = await forgotPasswordModel.safeParseAsync(req.body);
  if (user.error) throw ApiError.badRequest("invalide email");

  const { email } = user.data;
  await authService.forgotPassword(email);

  return ApiResponse.ok(res, "verification email sent to user");
};

const resetPasswordController = async (req: Request, res: Response) => {
  const userPassword = await resetPasswordModel.safeParseAsync(req.body);
  if (userPassword.error)
    throw ApiError.badRequest(`invalide otp ${userPassword.error.message}`);

  const { token, newPassword } = userPassword.data;
  await authService.resetPassword(token, newPassword);

  return ApiResponse.ok(res, "user password changed successfully");
};

export {
  registerController,
  verifyEmailController,
  refreshTokenController,
  signInController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
};
