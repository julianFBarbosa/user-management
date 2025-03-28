import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { IsEmail, IsInt, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";

extendZodWithOpenApi(z);

export class UserEntity {
	@IsInt()
	id: number;

	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsInt()
	@IsOptional()
	age?: number | null;

	@IsString()
	@IsOptional()
	document?: string | null;


	@IsString()
	@MinLength(8)
	password?: string;

	createdAt: Date;
	updatedAt?: Date | null;
	deletedAt?: Date | null;
}
