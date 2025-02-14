import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from '../dtos/post.dto';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostDto) {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
