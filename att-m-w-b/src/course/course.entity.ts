import { AdminEntity } from "src/admin/admin.entity";
import { AttendanceEntity } from "src/attendance/attendance.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('course')
export class CourseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column({nullable : false})
    description : string;

    @Column({type : 'date', nullable : true})
    startDate : String;

    @Column({type : 'date', nullable : true})
    endDate : Date;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

      // 🔥 admin과 연결
  @ManyToOne(() => AdminEntity, (admin) => admin.courses, {
    onDelete: 'CASCADE',
  })
  admin: AdminEntity;

  // 🔥 attendance와 연결
  @OneToMany(() => AttendanceEntity, (attendance) => attendance.course)
  attendances: AttendanceEntity[];


}