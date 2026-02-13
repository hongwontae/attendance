import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentEntity) private studentRepo : Repository<StudentEntity>
    ){}

    async createStudent(studentInfo : CreateStudentDto){
        const student = this.studentRepo.create(studentInfo);
        const savedStudent = await this.studentRepo.save(student);
        return savedStudent
    }

    async updateStudent(updateStudentInfo : UpdateStudentDto, id : number){

        const findStudent = await this.studentRepo.findOneBy({id});

        if(!findStudent){
            throw new NotFoundException('No Student');
        }

        // merge -> Object.assign을 내부적으로 사용하지만 typeorm의 cycle에 포함되어 안정적
        this.studentRepo.merge(findStudent, updateStudentInfo);

        return await this.studentRepo.save(findStudent);
        
    }

    async findAllStudent(){
        const allStudent = await this.studentRepo.find();

        if(!allStudent){
            throw new NotFoundException('데이터를 추가하지 않았습니다.')
        }
        
        return allStudent;
    }

    async findOneStudent(id : number){
        const oneStudent = await this.studentRepo.findOneBy({id});

        if(!oneStudent){
            throw new NotFoundException('찾고자 하는 학생이 없습니다.')
        }

        return oneStudent;
    }

    async deleteOneStudnet(id : number){
        const oneStudent = await this.studentRepo.findOneBy({id});
        
        if(!oneStudent){
            throw new NotFoundException('삭제하고자 하는 학생이 없습니다.')
        }

        return await this.studentRepo.remove(oneStudent)
        
    }

}
