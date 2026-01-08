import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env";

type JWTPayload = Record<string, any>;

export function createAccessToken(payload: JWTPayload): string {
    const options: SignOptions = { expiresIn: config.JWT_ACCESS_EXPIRES_IN as any };
    return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, options);
}

export function createRefreshToken(payload: JWTPayload): string {
    const options: SignOptions = { expiresIn: config.JWT_REFRESH_EXPIRES_IN as any };
    return jwt.sign(payload, config.JWT_REFRESH_SECRET as string, options);
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, config.JWT_ACCESS_SECRET as string);
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, config.JWT_REFRESH_SECRET as string);
}