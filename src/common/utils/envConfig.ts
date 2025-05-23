import dotenv from "dotenv";
import { cleanEnv, host, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
	HOST: host({ devDefault: testOnly("localhost") }),
	PORT: port({ devDefault: testOnly(3000) }),
	CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
	TOKEN_SECRET: str({ devDefault: testOnly("ultra-secret-password") }),
	DATABASE_URL: str({ devDefault: testOnly("postgresql://root:root@localhost:5332/user-management?schema=public") }),
});
