import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerListDto } from './dto/create-manager_list.dto';
import { ManagerList } from './entities/manager_list.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerListService {
  constructor(
    @InjectRepository(ManagerList)
    private ManagerListRepo: Repository<ManagerList>,
    private mailerService: MailerService,
  ) {}
  create(Dto: CreateManagerListDto) {
    return this.ManagerListRepo.save(Dto);
  }

  findAll() {
    return this.ManagerListRepo.find();
  }

  findOne(id: number) {
    return this.ManagerListRepo.findOneBy({ id });
  }

  update(id: number, Dto: CreateManagerListDto) {
    return this.ManagerListRepo.update(id, Dto);
  }

  remove(id: number) {
    return this.ManagerListRepo.delete(id);
  }
  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
  async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password = hassedpassed;
    return this.ManagerListRepo.save(mydto);
  }
  async signin(mydto) {
    console.log(mydto);
    const mydata = await this.ManagerListRepo.findOneBy({ email: mydto.email });
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
}
