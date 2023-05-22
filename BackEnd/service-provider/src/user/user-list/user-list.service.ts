import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UserList } from './entities/user-list.entity';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList)
    private UserListRepo: Repository<UserList>,
    private mailerService: MailerService,
  ) {}
  create(Dto: CreateUserListDto) {
    return this.UserListRepo.save(Dto);
  }

  findAll() {
    return this.UserListRepo.find();
  }

  findOne(id: number) {
    return this.UserListRepo.findOneBy({ id });
  }
  findOneByEmail(email: string) {
    return this.UserListRepo.findOneBy({ email });
  }

  update(id: number, Dto: CreateUserListDto) {
    return this.UserListRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.UserListRepo.delete(id);
  }
  async sendEmail(mydata: any) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }

  async signup(mydto: any) {
    const existingUser = await this.UserListRepo.findOneBy({
      email: mydto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(mydto.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(
      mydto.confirmPassword,
      salt,
    );
    mydto.password = hashedPassword;
    mydto.confirmPassword = hashedConfirmPassword;
    mydto.filename = '1.jpg';

    return this.UserListRepo.save(mydto);
  }

  async signin(mydto: any) {
    const mydata = await this.UserListRepo.findOneBy({ email: mydto.email });
    if (mydata !== null && mydata.password !== null) {
      const isMatch = await bcrypt.compare(mydto.password, mydata.password);
      if (isMatch) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
