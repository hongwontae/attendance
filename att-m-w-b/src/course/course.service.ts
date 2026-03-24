import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class CourseService {

    constructor(
        @InjectRepository(CourseEntity) private readonly courseRepo : Repository<CourseEntity>,
        private readonly adminService : AdminService
    ){}

    async createCourse(courseInfo : CreateCourseDto, adminId : number){

        const oneCourse = this.courseRepo.create({...courseInfo, admin : {id : adminId}});

        if(!oneCourse){
            throw new NotFoundException('생성되지 않았습니다.')
        }

        return await this.courseRepo.save(oneCourse);
    }

    async updateCourse(updateCourseInfo : UpdateCourseDto, id : number, adminId : number){
        
        const whenCondition = {
            id : id,
            admin : {id : adminId}
        }

        const findCourse = await this.courseRepo.update(whenCondition, updateCourseInfo);

        if(!findCourse.affected){
            throw new NotFoundException('수업 내용이 변경되지 않았습니다.')
        }

        return await this.courseRepo.findOneBy(whenCondition);

        

    }

    async findAllCourse(adminId : number){
        const allCourse = await this.courseRepo.find({where : {admin : {id : adminId}}});

        if(!allCourse){
            throw new NotFoundException('추가된 수업이 없습니다.')
        }

        return allCourse;
    }

    async findOneCourse(id : number, adminId : number){
        const oneCourse = await this.courseRepo.findOneBy({id, admin : {id : adminId}});

        if(!oneCourse){
            throw new NotFoundException('찾고자 하는 수업이 등록되지 않았습니다.')
        }

        return oneCourse;

    }

    async deleteCourse(id : number, adminId : number){
        const oneCourse = await this.courseRepo.findOneBy({id, admin : {id : adminId}});

        if(!oneCourse){
            throw new NotFoundException('삭제하고자 하는 수업이 존재하지 않습니다.')
        }

        return await this.courseRepo.remove(oneCourse);

    }

    async detailCourse (id : number){
        return await this.courseRepo.findOne({
            where : {id},
            relations : ['enrollments', 'enrollments.student', 'enrollments.attendances']
        })
    }

    


}
