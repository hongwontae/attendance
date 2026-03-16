import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Repository } from 'typeorm';
import { CreateAttDto } from './dto/create-att.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity) private readonly attRepo : Repository<AttendanceEntity>
  ) {}


  async createAtt({date, enrollmentId, status} : CreateAttDto, adminId : number){

    console.log(adminId)

    const attOne = this.attRepo.create({
      admin : {id : adminId},
      status,
      date,
      enrollment : {id : enrollmentId}
    })

    if(!attOne){
      throw new NotFoundException('출석이 실패했습니다.')
    }

    return await this.attRepo.save(attOne)

  }


  async removeAll (){
    const attOne = await this.attRepo.findOneBy({id : 2})

    if(!attOne){
      return;
    }

    return this.attRepo.remove(attOne)
  }





}
