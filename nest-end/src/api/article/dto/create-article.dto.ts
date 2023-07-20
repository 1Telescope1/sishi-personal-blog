import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  articleTitle:string

  @IsString()
  articleContent:string

  @IsNumber()
  tagId:number
}
