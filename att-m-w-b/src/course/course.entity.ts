import { AdminEntity } from 'src/admin/admin.entity';
import { AttendanceEntity } from 'src/attendance/attendance.entity';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type : 'text',nullable: true })
  description?: string | null;

  @Column({ type: 'date', nullable: true })
  startDate?: string | null;

  @Column({ type: 'date', nullable: true })
  endDate?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔥 admin과 연결
  @ManyToOne(() => AdminEntity, (admin) => admin.courses, {
    onDelete: 'CASCADE',
  })
  admin: AdminEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];

  // 🔥 attendance와 연결
  @OneToMany(() => AttendanceEntity, (attendance) => attendance.course)
  attendances: AttendanceEntity[];
}
