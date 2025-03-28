import type { UserEntity } from "@/api/user/userModel";
import { JWT_EXPIRATION_TIME } from "@/constants";
import { hash } from "bcryptjs";
import prisma, { UserCreateInput } from "../../database/prismaService";
import { CreateUserDTO } from "../entities/userEntity";

export class UserRepository {
	private mapUserToPrismaInput(user: CreateUserDTO): UserCreateInput {
		return {
			name: user.name,
			document: user.document,
			email: user.email,
			age: user.age,
			password: user.password,
		}
	}

	async create(dto: CreateUserDTO): Promise<UserEntity> {
		const hashedPassword = await hash(dto.password, 10);
		const mappedUser = this.mapUserToPrismaInput({
			...dto,
			password: hashedPassword
		});

		const user = await prisma.user.create({
			data: {
				...mappedUser
			},
		});


		await prisma.userAuthentication.create({
			data: {
				userId: user.id,
				expireDate: new Date(Date.now() + JWT_EXPIRATION_TIME * 1000),
				isLogged: true,
			}
		});
		return user
	}

	async findAll(): Promise<Omit<UserEntity, 'password'>[]> {
		return prisma.user.findMany({
			where: {
				UserAuthentication: {
					some: {
						expireDate: {
							gte: new Date()
						}
					}
				}
			},
			omit: {
				password: true,
			}
		});
	}

	async findById(id: number): Promise<UserEntity | null> {
		return prisma.user.findFirst({
			where: {
				id
			},
			omit: {
				password: true,
			}
		});
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		return prisma.user.findFirst({
			where: {
				email
			}
		});
	}


	async findByDocument(document: string): Promise<UserEntity | null> {
		return prisma.user.findFirst({
			where: {
				document
			}
		});
	}


	async userLogin(id: number) {
		// não é o caminho mais performático, mas é uma forma mais ágil de se fazer isso.
		const auth = await prisma.userAuthentication.findFirst({
			where: {
				userId: id,
			}
		});

		await prisma.userAuthentication.update({
			where: {
				id: auth?.id,
			},
			data: {

				expireDate: new Date(Date.now() + JWT_EXPIRATION_TIME * 1000),
				isLogged: true,
			}
		});
	}
}
