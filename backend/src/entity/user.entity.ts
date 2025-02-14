import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostEntity } from './post.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';


export enum ROLES{
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

@ObjectType() 
@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ApiProperty({ example: 'test@gmail.com', description: 'Email của người dùng' })
  @Column({ unique: true })
  @Field()
  email: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên người dùng' })
  @Column({})
  @Field()
  fullName: string;

  @ApiProperty({ example: 'String123', description: 'Mật khẩu của người dùng' })
  @Column({})
  @Exclude()
  @Field()
  password: string;

  @ApiPropertyOptional({ example: 'ADMIN, MOD, USER', description: 'Chỉ định quyền người dùng (Optinal-Default: USER)' })
  @Column({default: ROLES.USER})
  @Exclude()
  role: ROLES;


  @OneToMany(() => PostEntity, (post) => post.author)
  @Field(() => [PostEntity], { nullable: true }) 
  posts: PostEntity[];
}
