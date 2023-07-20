import { IsString ,IsNumber} from "class-validator";

export class CreateTalkDto {
  @IsString()
  content:string

}
