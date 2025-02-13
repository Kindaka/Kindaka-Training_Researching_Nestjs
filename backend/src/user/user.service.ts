import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  create(user: RegisterUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
