import { JWT_EXPIRATION_TIME } from "@/constants";
import * as jwt from "jsonwebtoken";

export class Auth {
    sign(signToken: Record<string, unknown>) {
        return jwt.sign(signToken, process.env.TOKEN_SECRET as string, { expiresIn: JWT_EXPIRATION_TIME });
    }

    verify(token: Record<string, unknown>) {
        try {
            return jwt.verify(token?.id as string, process.env.TOKEN_SECRET as string);
        } catch (e) {
            console.log("Auth error", e);
            return false;
        }
    }
}
