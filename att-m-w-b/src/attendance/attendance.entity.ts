import { AdminEntity } from 'src/admin/admin.entity';
import { CourseEntity } from 'src/course/course.entity';
import { StudentEntity } from 'src/student/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

@Entity('attendance')
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  courseId: number;

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
  student: StudentEntity;

  // 🔥 course 연결
  @ManyToOne(() => CourseEntity, (course) => course.attendances, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  // 🔥 admin 연결 (데이터 격리용)
  @ManyToOne(() => AdminEntity, (admin) => admin.attendances, {
    onDelete: 'CASCADE',
  })
  admin: AdminEntity;
}
