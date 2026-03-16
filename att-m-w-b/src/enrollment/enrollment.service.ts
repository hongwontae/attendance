import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Injectable()
export class EnrollmentService {

    constructor(
        @InjectRepository(EnrollmentEntity) private readonly enrollmentRepo : Repository<EnrollmentEntity>
    ){}

    async enroll(studentId : number, courseId : number, adminId : number){
        const registerdEnroll = this.enrollmentRepo.create({
            admin : {id : adminId},
            student : {id : studentId},
            course : {id : courseId}
        })

        if(!registerdEnroll){
            throw new NotFoundException('등록되지 않았습니다.')
        }


        return await this.enrollmentRepo.save(registerdEnroll)
    }


}
