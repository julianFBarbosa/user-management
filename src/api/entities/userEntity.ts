import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsOptional()
    age?: number;

    @Length(11)
    @IsOptional()
    document?: string;
};

export class UserLoginDTO {
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password: string;
};

