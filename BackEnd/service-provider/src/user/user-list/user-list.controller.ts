import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UserListService } from './user-list.service';
@Controller('user')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}
  //@UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createUserListDto: CreateUserListDto) {
    return this.userListService.create(createUserListDto);
  }

  //@UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Get('/get')
  findAll() {
    return this.userListService.findAll();
  }
  //@UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userListService.findOne(+id);
  }
  @Get('/getByEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userListService.findOneByEmail(email);
  }
  //@UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() createUserListDto: CreateUserListDto,
  ) {
    return this.userListService.update(+id, createUserListDto);
  }
  //@UsePipes(new ValidationPipe())
  //@UseGuards(new SessionGuard())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userListService.remove(+id);
  }
  //@UsePipes(new ValidationPipe())
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.userListService.sendEmail(mydata);
  }
  @Post('/signup')
  /*@UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )*/
  signup(
    @Body() mydto: CreateUserListDto,

    /*@UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 160000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,*/
  ) {
    //mydto.filename = file.filename;
    //console.log(file);
    return this.userListService.signup(mydto);
  }
  @Post('/signin')
  async signin(@Body() mydto) {
    const isAuthenticated = await this.userListService.signin(mydto);
    if (isAuthenticated) {
      return { message: 'Login successful' };
    } else {
      return (
        { message: 'Invalid email or password' } &&
        this.userListService.signin(mydto)
      );
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
