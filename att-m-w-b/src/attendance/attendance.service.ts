import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity, AttendanceStatus } from './attendance.entity';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attRepo: Repository<AttendanceEntity>,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollRepo: Repository<EnrollmentEntity>,
  ) {}

  // 임의로 날짜를 조작하여 Test
  async testMakeAttendance(
    adminId: number,
    courseId: number,
    studentId: number,
    status: AttendanceStatus,
    date: string,
  ) {
    const enrollment = await this.enrollRepo.findOne({
      where: {
        student: { id: studentId },
        course: { id: courseId },
        admin: { id: adminId },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('수강 정보 없음');
    }

    const today = date;

    await this.attRepo.upsert(
      {
        enrollment: { id: enrollment.id },
        admin: { id: adminId },
        date: today,
        status,
      },
      ['enrollment', 'date'], // 👈 unique 기준
    );

    // 필요하면 다시 조회해서 반환
    return await this.attRepo.findOne({
      where: {
        enrollment: { id: enrollment.id },
        date: today,
      },
    });
  }

  // 실제 브라우저 연동 Service
  // 실제 Service 용도입니다. 날짜는 백엔드 로직에서 처리합니다.
  async makeAttendance(
    adminId: number,
    courseId: number,
    studentId: number,
    status: AttendanceStatus,
  ) {
    const enrollment = await this.enrollRepo.findOne({
      where: {
        student: { id: studentId },
        course: { id: courseId },
        admin: { id: adminId },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('수강 정보 없음');
    }

    const today = new Date().toISOString().slice(0, 10);

    await this.attRepo.upsert(
      {
        enrollment: { id: enrollment.id },
        admin: { id: adminId },
        date: today,
        status,
      },
      ['enrollment', 'date'], // 👈 unique 기준
    );

    // 필요하면 다시 조회해서 반환
    return await this.attRepo.findOne({
      where: {
        enrollment: { id: enrollment.id },
        date: today,
      },
    });
  }

  async findRecentAttendances(adminId : number, courseId : number, studentId : number){
    const recentAttendances = await this.attRepo
  .createQueryBuilder('attendance')
  .innerJoin('attendance.enrollment', 'enrollment')
  .innerJoin('enrollment.student', 'student')

  .where('student.id = :studentId', { studentId })
  .andWhere('enrollment.courseId = :courseId', { courseId })
  .andWhere('enrollment.adminId = :adminId', { adminId })

  .select([
    'attendance.id',
    'attendance.date',
    'attendance.status',
  ])

  .orderBy('attendance.date', 'DESC')
  .limit(5)

  .getMany();

  return recentAttendances;

  }



}
