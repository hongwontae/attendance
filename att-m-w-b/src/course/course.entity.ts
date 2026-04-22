import { AdminEntity } from 'src/admin/admin.entity';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';
import { InstructorEntity } from 'src/instructor/instructor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'date', nullable: true })
  startDate?: Date | null;

  @Column({ type: 'date', nullable: true })
  endDate?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔥 admin과 연결
  @ManyToOne(() => AdminEntity, (admin) => admin.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name : 'adminId'})
  admin: AdminEntity;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];

  @ManyToOne(() => InstructorEntity, (instructor) => instructor.courses, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'instructorId' })
  instructor: InstructorEntity;
}
