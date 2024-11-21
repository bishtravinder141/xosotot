export const JWT_ALG = "HS256";
export const JWT_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
export const SESSION_COOKIE_NAME = "SESSION";
