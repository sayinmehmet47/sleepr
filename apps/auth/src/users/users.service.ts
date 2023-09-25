import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hashSync(createUserDto.password, 10),
    });
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne(getUserDto);
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ email });

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        throw new UnauthorizedException('Credentials are not valid.');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
