import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFeedBackDto } from './dto/create-feed-back.dto';
import { FeedBackService } from './feed-back.service';

@Controller('feedback')
export class FeedBackController {
  constructor(private readonly feedBackService: FeedBackService) {}
  @UsePipes(new ValidationPipe())
  @Post('/insert')
  create(@Body() createFeedBackDto: CreateFeedBackDto) {
    return this.feedBackService.create(createFeedBackDto);
  }
  @UsePipes(new ValidationPipe())
  @Get('/get')
  findAll() {
    return this.feedBackService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Get('/get/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.feedBackService.findOne(+id);
  }
  @UsePipes(new ValidationPipe())
  @Put('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() Dto: CreateFeedBackDto,
  ) {
    return this.feedBackService.update(+id, Dto);
  }
  @UsePipes(new ValidationPipe())
  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.feedBackService.remove(+id);
  }
}
