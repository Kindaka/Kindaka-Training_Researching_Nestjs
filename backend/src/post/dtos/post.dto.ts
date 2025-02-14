import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field(()=> Number)
  @IsNotEmpty()
  authorId: number;
}

@InputType()
export class UpdatePostDto {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
