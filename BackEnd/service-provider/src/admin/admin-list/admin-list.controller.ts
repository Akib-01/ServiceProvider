import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  // eslint-disable-next-line prettier/prettier
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserListDto } from 'src/user/user-list/dto/create-user-list.dto';
import { loginDto } from 'src/user/user-list/dto/login.dto';
import { SessionGuard } from 'src/user/user-list/session.guard';
import { AdminListService } from './admin-list.service';

@Controller('admin')
export class AdminListController {
  constructor(private readonly adminListService: AdminListService) {}
  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createUserListDto: CreateUserListDto) {
    return this.adminListService.create(createUserListDto);
  }

  @UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Get('/get')
  findAll() {
    return this.adminListService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.adminListService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() createUserListDto: CreateUserListDto,
  ) {
    return this.adminListService.update(+id, createUserListDto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.adminListService.remove(+id);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(new SessionGuard())
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.adminListService.sendEmail(mydata);
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
    @Body() mydto: CreateUserListDto,

    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 160000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    //mydto.filename = file.filename;
    console.log(file);
    return this.adminListService.signup(mydto);
  }
  @Get('/signin')
  signin(@Session() session, @Body() mydto: loginDto) {
    if (this.adminListService.signin(mydto)) {
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
