import { Auth } from '@/common/utils/auth';
import { BadRequestError } from 'routing-controllers';
import { CreateUserDTO } from '../entities/userEntity';
import { UserEntity } from '../userModel';
import { UserRepository } from '../userRepository';
import { UserService } from '../userService';

jest
jest.mock('../userRepository');
jest.mock('@/common/utils/auth');

describe('UserService', () => {
    let service: UserService;
    let mockRepository: jest.Mocked<UserRepository>;
    let mockAuth: jest.Mocked<Auth>;

    beforeEach(() => {
        mockRepository = new UserRepository() as jest.Mocked<UserRepository>;
        mockAuth = new Auth() as jest.Mocked<Auth>;
        service = new UserService(mockRepository, mockAuth);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const mockUserDto: CreateUserDTO = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'password123',
            };

            const mockUser: UserEntity = {
                id: 1,
                ...mockUserDto,
                password: 'hashed_password',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockRepository.findByDocument.mockResolvedValue(null);
            mockRepository.create.mockResolvedValue(mockUser);

            const result = await service.create(mockUserDto);

            expect(result).toEqual(expect.objectContaining({ id: 1, name: 'Test User' }));
            expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test User' }));
        });

        it('should throw an error if user already exists', async () => {
            const mockUserDto: CreateUserDTO = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'password123',
            };

            mockRepository.findByDocument.mockResolvedValue({ id: 1 } as UserEntity);

            await expect(service.create(mockUserDto)).rejects.toThrow(BadRequestError);
        });
    });
});