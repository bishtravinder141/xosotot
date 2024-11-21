import { JWT_ALG, JWT_KEY, SESSION_COOKIE_NAME } from "@config/auth";
import type { JWTPayload } from "jose";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

export declare interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  gender: string;
  qrcode: string;
  avatar: string;
  login_by: string;
  real_name: string | null;
  created_at: string;
  updated_at: string;
  invitation_code: string;
  phone_verified_at: string | null;
  email_verified_at: string | null;
}

export declare interface Session extends JWTPayload {
  user: User;
  token: string;
}

export async function encodeSession(session: Session): Promise<string> {
  return new SignJWT(session).setProtectedHeader({ alg: JWT_ALG }).setIssuedAt().sign(JWT_KEY);
}

export async function decodeSession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify<Session>(token, JWT_KEY);

    return {
      user: payload.user,
      token: payload.token,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    const session = await decodeSession(token);

    if (session) {
      return session;
    }
  }

  throw new Error("Session not found");
}

export async function setSession(session: Session) {
  const token = await encodeSession(session);

  cookies().set(SESSION_COOKIE_NAME, token, {
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

export function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}
