import { AdminEntity } from 'src/admin/admin.entity';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { CourseEntity } from 'src/course/course.entity';
import { StudentEntity } from 'src/student/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('enrollment')
@Unique('UQ_STUDENT_COURSE', ['student', 'course'])
export class EnrollmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔥 Student 연결
  @ManyToOne(() => StudentEntity, (student) => student.enrollments, {
    onDelete: 'CASCADE',
    nullable : false
  })
  @JoinColumn({ name: 'studentId' })
  student: StudentEntity;

  // 🔥 Course 연결
  @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
    onDelete: 'CASCADE',
    nullable : false
  })
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  // 🔥 Admin 연결 (데이터 격리)
  @ManyToOne(() => AdminEntity, (admin) => admin.enrollments, {
    onDelete: 'CASCADE',
    nullable : false
  })
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.enrollment)
  attendances: AttendanceEntity[];
}
