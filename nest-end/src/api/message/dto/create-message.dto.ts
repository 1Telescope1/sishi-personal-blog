import { IsNumber, IsString } from "class-validator"

export class CreateMessageDto {
  @IsNumber()
  userId:number

  @IsString()
  commentContent:string
}
