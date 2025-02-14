import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/auth.dto';
import { UpdateUserDto } from './dtos/user.dto';
import { Permission } from 'src/helpers/checkPermission.helper';
import { first } from 'rxjs';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number){
    return this.userRepository.findOneBy({ id });
  }

  create(user: RegisterUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updatedUser: UpdateUserDto, currentUser: UserEntity){

    if(updatedUser.role){
        throw new BadRequestException('Bạn không được cập nhật quyền');
    } 

    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }
    // Nếu User có id là 1 thì không được update user của id 2 và ngược lại
    Permission.check(id, currentUser);

    // Log giá trị của updatedUser để kiểm tra
    console.log('Updated User Data:', updatedUser);

    user = { ...user, ...updatedUser };

    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    
     
    const updateUser = await this.userRepository.save(user);
    return{
      firstName: updateUser.fullName,
      email: updateUser.email,
    }
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy ({ email });
  }

  async remove(id: number, currentUser: UserEntity) {
    const user = await this.findOne(id);

    Permission.check(id, currentUser);

    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }

    return this.userRepository.remove(user);
  }
}
