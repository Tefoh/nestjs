import { IsNotEmpty, MinLength, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  slug: string;

  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  content: string;
}
