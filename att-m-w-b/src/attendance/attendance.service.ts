import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {

    constructor(
        @InjectRepository(AttendanceEntity) private readonly attRepo : Repository<AttendanceEntity>
    ){}

    createAdmin(){
        
    }

}
