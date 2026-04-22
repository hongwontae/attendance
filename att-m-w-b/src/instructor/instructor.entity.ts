import { AdminEntity } from "src/admin/admin.entity";
import { CourseEntity } from "src/course/course.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('instructor')
export class InstructorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔥 Admin 연결 (멀티 테넌시 유지)
  @ManyToOne(() => AdminEntity, (admin) => admin.instructors, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({name : 'adminId'})
  admin: AdminEntity;

  // 🔥 Course 연결
  @OneToMany(() => CourseEntity, (course) => course.instructor)
  courses: CourseEntity[];
}