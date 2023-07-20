import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {validate} from 'class-validator'
 
@Injectable()
export class usePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO=plainToInstance(metadata.metatype,value)
    const errors=await validate(DTO)
    if(errors.length) {
      console.log(errors);
      
      throw new HttpException(errors,HttpStatus.BAD_REQUEST)
    }
    
    
    return value;
  }
}
