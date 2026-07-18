import { and, eq, gt } from "drizzle-orm";
import { db } from "../../common/config/index.js";
import { ApiError } from "../../common/utils/api-error.js";
import { seatsTable, userTable } from "../../common/config/db.schema.js";
import {
  generateAccessToken,
  generateOtp,
  generateRefreshToken,
  generateVerficationToken,
  hashPassword,
  verifyRefreshToken,
} from "../../common/utils/tokens.utils.js";
import {
  sendVerificationTokenEmail,
  sendVerificationTokenForgotPassword,
} from "../../common/config/email.js";

const register = async (name: string, email: string, password: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (user?.email === email) throw ApiError.badRequest("user already exists");

  // password hashed
  const hashedPassword = await hashPassword.hash(password);

  // verification token
  const rawToken = generateVerficationToken.rawToken();
  const verificationToken = generateVerficationToken.hashedToken(rawToken);
  const verificationTokenExpiresIn = new Date(Date.now() + 15 * 60 * 1000);

  const [insertUser] = await db
    .insert(userTable)
    .values({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresIn,
    })
    .returning({ name: userTable.name });

  if (!insertUser)
    throw ApiError.serverNotResponding("server not responding try again");
  //verification token email
  try {
    sendVerificationTokenEmail(insertUser?.name, rawToken);
  } catch (error) {
    throw ApiError.badRequest("try again verification token not sent");
  }

  return { rawToken };
};

const verifyEmail = async (token: string) => {
  const hashedToken = generateVerficationToken.hashedToken(token);
  const time = new Date();

  const tokenVerification = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.verificationToken, hashedToken),
        gt(userTable.verificationTokenExpiresIn, time)
      )
    );

  if (!tokenVerification) {
    throw ApiError.unauthorize("session timeout");
  }

  await db.update(userTable).set({
    verifyEmail: true,
    verificationToken: null,
    verificationTokenExpiresIn: null,
  });
};

const refreshToken = async (token: string) => {
  const decoded = verifyRefreshToken(token);

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, decoded.id));
  if (!user) throw ApiError.unauthorize("invalid refresh token");

  // generate access and refresh token
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  // hashed refresh token
  const hashedRefreshToken = generateVerficationToken.hashedToken(refreshToken);

  await db
    .update(userTable)
    .set({ refreshToken: hashedRefreshToken })
    .where(eq(userTable.id, user.id));

  return { accessToken, refreshToken };
};

const signIn = async (email: string, password: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  if (!user) throw ApiError.unauthorize("invalide email or password");

  const isPasswordValid = await hashPassword.compare(password, user.password);
  if (!isPasswordValid)
    throw ApiError.unauthorize("invalid user password or email");

  // generate access and refresh token
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  // hashed refresh token
  const hashedRefreshToken = generateVerficationToken.hashedToken(refreshToken);

  const updatedResult = await db
    .update(userTable)
    .set({ refreshToken: hashedRefreshToken })
    .where(eq(userTable.id, user.id))
    .returning({ id: userTable.id });

  return { accessToken, refreshToken, updatedResult };
};

const signOut = async (userId: string) => {
  await db
    .update(userTable)
    .set({ refreshToken: null })
    .where(eq(userTable.id, userId));
};

const forgotPassword = async (email: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  if (!user) throw ApiError.unauthorize("email do not exists");

  // generate verification token
  const rawToken = generateOtp();
  const verificationToken = generateVerficationToken.hashedToken(rawToken);
  const verificationTokenExpiresIn = new Date(Date.now() + 15 * 60 * 1000);

  const [userUpdate] = await db
    .update(userTable)
    .set({
      verificationToken,
      verificationTokenExpiresIn,
    })
    .where(eq(userTable.id, user.id))
    .returning({ name: userTable.name });
  if (!userUpdate) {
    throw ApiError.serverNotResponding("password not updated try again");
  }

  // send email
  try {
    sendVerificationTokenForgotPassword(userUpdate?.name, rawToken);
  } catch (error) {
    throw ApiError.serverNotResponding("verification email not sent try again");
  }

  return { rawToken };
};

const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = generateVerficationToken.hashedToken(token);
  const time = new Date();

  const [user] = await db
    .select()
    .from(userTable)
    .where(
      and(
        eq(userTable.verificationToken, hashedToken),
        gt(userTable.verificationTokenExpiresIn, time)
      )
    );
  if (!user) throw ApiError.unauthorize("session timeout");

  const hashedPassword = await hashPassword.hash(newPassword);

  await db
    .update(userTable)
    .set({
      verificationToken: null,
      verificationTokenExpiresIn: null,
      password: hashedPassword,
    })
    .where(eq(userTable.id, user.id));
};

export {
  register,
  verifyEmail,
  refreshToken,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
};
