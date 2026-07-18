import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/config.env.js";

interface userTokenPayload {
  id: string;
}

// jwt tokens
export const generateAccessToken = (payload: userTokenPayload) => {
  const secret = env.ACCESS_TOKEN as Secret;
  const option: SignOptions = {
    expiresIn: (env.ACCESS_TOKEN_EXPIRES_IN ?? "15m") as NonNullable<
      SignOptions["expiresIn"]
    >,
  };

  const token = jwt.sign(payload, secret, option);
  return token;
};

export const verifyAccessToken = (token: string) => {
  const secret = env.ACCESS_TOKEN as Secret;
  const payload = jwt.verify(token, secret) as userTokenPayload;

  return payload;
};

export const generateRefreshToken = (payload: userTokenPayload) => {
  const secret = env.REFRESH_TOKEN as Secret;
  const option: SignOptions = {
    expiresIn: (env.REFRESH_TOKEN_EXPIRES_IN ?? "15m") as NonNullable<
      SignOptions["expiresIn"]
    >,
  };

  const token = jwt.sign(payload, secret, option);
  return token;
};

export const verifyRefreshToken = (token: string) => {
  const secret = env.REFRESH_TOKEN as Secret;
  const payload = jwt.verify(token, secret) as userTokenPayload;

  return payload;
};

// password hashing
export class hashPassword {
  static hash(password: string) {
    return bcrypt.hash(password, 12);
  }

  static compare(plainPassword: string, hashPassword: string) {
    return bcrypt.compare(plainPassword, hashPassword);
  }
}

// verification token
export class generateVerficationToken {
  static rawToken() {
    return crypto.randomBytes(32).toString("hex");
  }
  static hashedToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}

// verification token otp
export const generateOtp = (): string => {
  const otp = crypto.randomInt(100000, 1000000).toString(); // send random value b/w 0 to 999999
  return otp;
};
