import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType() // Đánh dấu là ObjectType cho GraphQL
@Entity({ name: 'posts' })
export class PostEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  // Thiết lập quan hệ với UserEntity
  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE', eager: true }) 
  @JoinColumn({ name: 'authorId' }) // Liên kết với cột authorId
  @Field(() => UserEntity)
  author: UserEntity;
}
