import { AdminEntity } from 'src/admin/admin.entity';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
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
@Unique('UQ_ATTENDANCE_PER_DAY', ['enrollment', 'date'])
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

  @ManyToOne(() => EnrollmentEntity, (enrollment) => enrollment.attendances, {
    onDelete: 'CASCADE',
    nullable : false
  })
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: EnrollmentEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.attendances, {
    onDelete: 'CASCADE',
    nullable : false
  })
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;
}
