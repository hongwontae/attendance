import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(CourseEntity) private readonly courseRepo : Repository<CourseEntity>){}

    async createCourse(courseInfo : CreateCourseDto){
        const oneCourse = this.courseRepo.create(courseInfo);

        if(!oneCourse){
            return;
        }

        return await this.courseRepo.save(oneCourse);
    }

    async updateCourse(updateCourseInfo : UpdateCourseDto, id : number){
        const oneCourse = await this.courseRepo.findOneBy({id});

        if(!oneCourse){
            throw new NotFoundException('갱신하고자 하는 수업이 없습니다.')
        }

        this.courseRepo.merge(oneCourse, updateCourseInfo);

        return await this.courseRepo.save(oneCourse);

    }

    async findAllCourse(){
        const allCourse = await this.courseRepo.find();

        if(!allCourse){
            throw new NotFoundException('추가된 수업이 없습니다.')
        }

        return allCourse;
    }

    async findOneCourse(id : number){
        const oneCourse = await this.courseRepo.findOneBy({id});

        if(!oneCourse){
            throw new NotFoundException('찾고자 하는 수업이 등록되지 않았습니다.')
        }

        return oneCourse;

    }

    async deleteCourse(id : number){
        const oneCourse = await this.courseRepo.findOneBy({id});

        if(!oneCourse){
            throw new NotFoundException('삭제하고자 하는 수업이 존재하지 않습니다.')
        }

        return await this.courseRepo.remove(oneCourse);

    }


}
