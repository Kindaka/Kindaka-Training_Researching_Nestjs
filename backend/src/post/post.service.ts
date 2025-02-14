import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { CreatePostDto, UpdatePostDto } from './dtos/post.dto';
import { UserEntity } from 'src/entity/user.entity';
import { UpdatePostInput } from './dtos/update-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)  // Thêm UserRepository vào đây
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find({ relations: ['author'] });
  }



  async findById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'], // Nếu có quan hệ với UserEntity
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(data: CreatePostDto): Promise<PostEntity> {
    const author = await this.userRepository.findOne({ where: { id: data.authorId } });

    if (!author) {
        throw new Error('Author not found');
      }
      const newPost = this.postRepository.create({
        ...data,
        author,  // Gán author từ UserEntity
      });
      return this.postRepository.save(newPost);
  }

  async update(id: number, data: UpdatePostInput): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    Object.assign(post, data);
    return this.postRepository.save(post);
  }
  

  async delete(id: number): Promise<boolean> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.postRepository.delete(id);
    return true;
  }
}
