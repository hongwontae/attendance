import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
  ) {}

  async findAdmin(email : string){
    return await this.adminRepo.findOneBy({email});
  }

  async createAdmin(adminInfo: CreateAdminDto) {
    try {
      const { email, password } = adminInfo;

      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = this.adminRepo.create({ email, password: hashedPassword });

      return await this.adminRepo.save(admin);
      
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === 'SQLITE_CONSTRAINT'
      ) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
      throw error;
    }
  }
}
