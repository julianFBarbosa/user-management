import type { UserEntity } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { Auth } from "@/common/utils/auth";
import { commonValidations } from "@/common/utils/commonValidation";
import { logger } from "@/server";
import bcrypt from "bcryptjs";
import { injectable } from "inversify";
import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { CreateUserDTO, UserLoginDTO } from "../entities/userEntity";

@Service()
@injectable()
export class UserService {
	private userRepository: UserRepository;
	private auth: Auth;

	constructor(repository: UserRepository = new UserRepository(), auth: Auth = new Auth()) {
		this.userRepository = repository;
		this.auth = auth;
	}

	maskUser(user: UserEntity): UserEntity {
		const formattedDocument = user?.document?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**');
		return {
			...user,
			...(user.document && formattedDocument ? { document: formattedDocument } : {})
		}
	}

	async create(userDto: CreateUserDTO): Promise<UserEntity | undefined> {
		try {
			const document = userDto?.document?.replace(/\D/g, '')

			if (!document) {
				throw new BadRequestError("User with this document already exists");
			}

			if (!commonValidations.validateCpf(document)) {
				throw new BadRequestError("Invalid document");
			}

			const userExists = await this.userRepository.findByDocument(document);

			if (userExists) {
				throw new BadRequestError("User with this document already exists");
			}

			const user = await this.userRepository.create({
				...userDto,
				document: document
			});

			// O Token JWT pode ou não ser retornado nesse fluxo,
			// a depender da regra de negócio do cadastro de usuários. 
			// this.auth.sign({ id: user.id });

			return this.maskUser(user);
		} catch (ex) {
			const errorMessage = `Error on creating user:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			throw new BadRequestError(errorMessage);
		}
	}


	async findAll(): Promise<UserEntity[]> {
		try {
			const users = await this.userRepository.findAll();

			if (!users) {
				return [];
			}

			return users.map(this.maskUser);
		} catch (ex) {
			const errorMessage = `Error finding all users: $${(ex as Error).message}`;
			throw new Error(errorMessage);
		}
	}

	async findById(id: number): Promise<UserEntity | null> {
		try {
			const user = await this.userRepository.findById(id);

			if (!user) {
				return null;
			}

			return this.maskUser(user);
		} catch (ex) {
			const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			throw new Error(errorMessage);
		}
	}



	async login(userDto: UserLoginDTO): Promise<string> {
		try {
			const user = await this.userRepository.findByEmail(userDto?.email);

			if (!user) {
				throw new BadRequestError("User does not exist");
			}

			const passwordMatch = bcrypt.compare(userDto?.password, user.password!);

			if (!passwordMatch) {
				throw new BadRequestError("Invalid password");
			}

			await this.userRepository.userLogin(user.id);

			return this.auth.sign({ id: user.id });
		} catch (ex) {
			const errorMessage = `Error on logging in user:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			throw new BadRequestError(errorMessage);
		}
	}
}
