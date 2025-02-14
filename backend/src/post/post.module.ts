import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostResolver } from './resolvers/post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/post.entity';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostService, PostResolver],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
