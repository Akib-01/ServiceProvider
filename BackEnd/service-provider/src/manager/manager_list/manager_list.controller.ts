import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { CreateManagerListDto } from './dto/create-manager_list.dto';
import { loginDto } from './dto/login.dto';
import { ManagerListService } from './manager_list.service';

@Controller('manager')
export class ManagerListController {
  constructor(private readonly managerListService: ManagerListService) {}

  @Post('/insert')
  create(@Body() createManagerListDto: CreateManagerListDto) {
    return this.managerListService.create(createManagerListDto);
  }
  @UseGuards(new SessionGuard())
  @Get('/get')
  findAll() {
    return this.managerListService.findAll();
  }
  @UseGuards(new SessionGuard())
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.managerListService.findOne(+id);
  }
  @UseGuards(new SessionGuard())
  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() createManagerListDto: CreateManagerListDto,
  ) {
    return this.managerListService.update(+id, createManagerListDto);
  }
  @UseGuards(new SessionGuard())
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.managerListService.remove(+id);
  }
  @UseGuards(new SessionGuard())
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.managerListService.sendEmail(mydata);
  }

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() mydto: CreateManagerListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;
    console.log(file);
    return this.managerListService.signup(mydto);
  }

  @Get('/signin')
  signin(@Session() session, @Body() mydto: loginDto) {
    if (this.managerListService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }
  }
  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
}
