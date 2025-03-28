import { UserService } from "@/api/user/userService";
import { validateTokenMiddleware } from "@/common/auth/jwtService";
import validateUserRegistration from "@/common/middleware/userValidation";
import type { Response } from "express";
import { BadRequestError, Body, Get, JsonController, Param, Post, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { CreateUserDTO, UserLoginDTO } from "../entities/userEntity";
import { UserEntity } from './userModel';

@Service()
@JsonController('/users')
export class UserController {
	private userService: UserService;
	constructor(repository: UserService = new UserService()) {
		this.userService = repository;
	}

	@Get('/')
	public async getUsers(@Res() _response: Response) {
		const users = await this.userService.findAll();
		console.log('users', users)

		return users
	};

	@Get('/:id')
	public async getUser(@Param("id") id: number, @Res() response: Response): Promise<UserEntity | null> {
		const user = await this.userService.findById(Number(id));
		console.log('user', user)

		return user
	};

	@Post('/register')
	@UseBefore(validateUserRegistration)
	public async createUser(@Body() dto: CreateUserDTO): Promise<UserEntity | unknown> {
		try {
			return this.userService.create(dto);
		} catch (e: any) {
			console.log('e', e)
			throw new BadRequestError(e?.message)
		}
	};

	@Post('/login')
	public async login(@Body() dto: UserLoginDTO, @Res() res: Response): Promise<UserEntity | unknown> {
		try {
			return this.userService.login(dto);
		} catch (e: any) {
			console.log('e', e)
			throw new BadRequestError(e.message)
		}
	};
}
