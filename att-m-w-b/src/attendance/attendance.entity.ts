import { AdminEntity } from 'src/admin/admin.entity';
import { CourseEntity } from 'src/course/course.entity';
import { StudentEntity } from 'src/student/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

@Entity('attendance')
@Unique('UQ_ATTENDANCE_PER_DAY', ['student', 'course', 'date'])
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'simple-enum',
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

    // 🔥 student 연결
  @ManyToOne(() => StudentEntity, (student) => student.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name : 'studentId'})
  student : StudentEntity;

  // 🔥 course 연결
  @ManyToOne(() => CourseEntity, (course) => course.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name : 'courseId'})
  course: CourseEntity;

  // 🔥 admin 연결 (데이터 격리용)
  @ManyToOne(() => AdminEntity, (admin) => admin.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name : 'adminId'})
  admin: AdminEntity;
}
