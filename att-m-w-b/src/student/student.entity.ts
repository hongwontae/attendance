import { AdminEntity } from "src/admin/admin.entity";
import { AttendanceEntity } from "src/attendance/attendance.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable : true})
  age : number;

  @Column({ nullable: true })
  phone: string;

  @Column({nullable : true})
  pPhone : string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  memo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

    // 🔥 admin과 연결
  @ManyToOne(() => AdminEntity, (admin) => admin.students, {
    onDelete: 'CASCADE',
  })
  admin: AdminEntity;

  // 🔥 attendance 연결
  @OneToMany(() => AttendanceEntity, (attendance) => attendance.student)
  attendances: AttendanceEntity[];
}