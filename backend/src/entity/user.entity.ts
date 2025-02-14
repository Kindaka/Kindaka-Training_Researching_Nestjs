import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export enum ROLES{
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@gmail.com', description: 'Email của người dùng' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên người dùng' })
  @Column({})
  fullName: string;

  @ApiProperty({ example: 'String123', description: 'Mật khẩu của người dùng' })
  @Column({})
  @Exclude()
  password: string;

  @ApiPropertyOptional({ example: 'ADMIN, MOD, USER', description: 'Chỉ định quyền người dùng (Optinal-Default: USER)' })
  @Column({default: ROLES.USER})
  @Exclude()
  role: ROLES;
}
