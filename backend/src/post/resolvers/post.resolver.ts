import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from '../post.service';
import { PostEntity } from '../../entity/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { UpdatePostInput } from '../dtos/update-post.input';


@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostEntity], { name: 'posts' }) // Lấy tất cả bài viết
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => PostEntity, { nullable: true })
  async getPostById(@Args('id', { type: () => Int }) id: number): Promise<PostEntity> {
    return this.postService.findById(id);
  }

  @Mutation(() => PostEntity)
  createPost(@Args('data', { type: () => CreatePostDto }) data: CreatePostDto) {
    return this.postService.create(data);
  }
  

  @Mutation(() => PostEntity)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdatePostInput,
  ): Promise<PostEntity> {
    return this.postService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.postService.delete(id);
  }
}
