import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student-dto';
import { UpdateStudentDto } from './dto/update-student-dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,
    private readonly adminService: AdminService,
  ) {}

  async createStudent(studentInfo: CreateStudentDto) {
    // fk를 가진 엔티티 자체를 만들어서 admin fk 키에 추가해야 제대로 fk가 생성됩니다.
    const admin = await this.adminService.findAdminId(studentInfo.adminId);

    if (!admin) {
      throw new NotFoundException('Admin Not Found');
    }

    const student = this.studentRepo.create({
      ...studentInfo,
      admin: admin,
    });

    const savedStudent = await this.studentRepo.save(student);
    return savedStudent;
  }

  async updateStudent(
    updateStudentInfo: UpdateStudentDto,
    id: number,
    adminId: number,
  ) {

    const whereCondition = {
      id,
      admin: { id: adminId },
    };

    const result = await this.studentRepo.update(
      whereCondition,
      updateStudentInfo,
    );

    if (!result.affected) {
      throw new NotFoundException('업데이트가 실행되지 않았습니다.');
    }

    return this.studentRepo.findOne({ where: whereCondition });
  }

  async findAllStudent(adminId : number) {
    const allStudent = await this.studentRepo.find({
        where : {admin : {id : adminId}}
    });

    if (!allStudent) {
      throw new NotFoundException('데이터를 추가하지 않았습니다.');
    }

    return allStudent;
  }

  async findOneStudent(id: number, adminId : number) {
    const oneStudent = await this.studentRepo.findOneBy({ id, admin : {id : adminId} });

    if (!oneStudent) {
      throw new NotFoundException('찾고자 하는 학생이 없습니다.');
    }

    return oneStudent;
  }

  async deleteOneStudnet(id: number, adminId : number) {
    const oneStudent = await this.studentRepo.findOneBy({ id, admin : {id : adminId}});

    if (!oneStudent) {
      throw new NotFoundException('삭제하고자 하는 학생이 없습니다.');
    }

    return await this.studentRepo.remove(oneStudent);
  }

  

}
