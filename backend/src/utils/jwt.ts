import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

interface TokenPayload {
    id: string;
    role: "USER" | "ADMIN";
}

if (!JWT_SECRET) {
    throw new Error("No Jwt Secret Found")
}

export const signToken = (payload: TokenPayload) => {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: "1d",
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET!) as TokenPayload;
};