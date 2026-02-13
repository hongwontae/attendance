import { AttendanceEntity } from "src/attendance/attendance.entity";
import { CourseEntity } from "src/course/course.entity";
import { StudentEntity } from "src/student/student.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admin')
export class AdminEntity{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    email : string;

    @Column()
    password : string;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date

      // 관계 설정
  @OneToMany(() => CourseEntity, (course) => course.admin)
  courses: CourseEntity[];

  @OneToMany(() => StudentEntity, (student) => student.admin)
  students: StudentEntity[];

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.admin)
  attendances: AttendanceEntity[];
}