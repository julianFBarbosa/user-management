import { jest } from '@jest/globals';
import { Response } from 'express';
import { BadRequestError } from 'routing-controllers';
import { CreateUserDTO, UserLoginDTO } from '../../entities/userEntity';
import { UserController } from '../userController';
import { UserEntity } from '../userModel';
import { UserService } from '../userService';

jest.mock('../userService');

describe('UserController', () => {
	let controller: UserController;
	let mockUserService: jest.Mocked<UserService>;
	let mockResponse: Partial<Response>;

	beforeEach(() => {
		mockUserService = new UserService() as jest.Mocked<UserService>;
		controller = new UserController(mockUserService);
		mockResponse = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
	});

	describe('createUser', () => {
		it('should create a new user', async () => {
			const mockUserDto: CreateUserDTO = {
				name: 'Test User',
				email: 'test@test.com',
				password: 'password123',
			};

			const mockCreatedUser: UserEntity = {
				id: 1,
				...mockUserDto,
				password: 'hashed_password',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			mockUserService.create.mockResolvedValue(mockCreatedUser);

			const result = await controller.createUser(mockUserDto);

			expect(result).toEqual(mockCreatedUser);
			expect(mockUserService.create).toHaveBeenCalledWith(mockUserDto);
		});

		it('should handle creation errors', async () => {
			const mockUserDto: CreateUserDTO = {
				name: 'Test User',
				email: 'test@test.com',
				password: 'password123',
			};

			mockUserService.create.mockRejectedValue(new Error('User already exists'));

			await expect(controller.createUser(mockUserDto)).rejects.toThrow(BadRequestError);
		});
	});

	describe('getUsers', () => {
		it('should return all users', async () => {
			const mockUsers: UserEntity[] = [
				{ id: 1, name: 'Test User', email: 'test@test.com', password: 'hash', createdAt: new Date(), updatedAt: new Date() },
			];

			mockUserService.findAll.mockResolvedValue(mockUsers);

			const result = await controller.getUsers(mockResponse as Response);

			expect(result).toEqual(mockUsers);
			expect(mockUserService.findAll).toHaveBeenCalled();
		});
	});
});
