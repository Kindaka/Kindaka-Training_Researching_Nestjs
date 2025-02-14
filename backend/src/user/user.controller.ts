import { 
    Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, 
    ClassSerializerInterceptor,
    UseInterceptors,
    UseGuards
  } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entity/user.entity';
import { UpdateUserDto } from './dtos/user.dto';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto';
import { CurrentUser } from './decorators/user.decorator';


@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor) // Thg trên và dưới đều giống nhau chỉ khác mỗi ở trên là xài có sẵn phân biệt bằng @Exclude trong entity
@UseInterceptors(LoggingInterceptor) // Còn thg dưới là custom 
// Ghi Log Request & Response dữ liệu, Ẩn Thông Tin Nhạy Cảm (Password), Chuẩn Hóa Lỗi API 
export class UserController {
  constructor(private readonly userService: UserService, 
              private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<UserEntity[]> {
    console.log('Request from controller!');
    return this.userService.findAll();
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: UserEntity){
    return currentUser;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }


  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<UserEntity> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Post('/register')
  register(@Body() requestBody: RegisterUserDto) {
    return this.authService.register(requestBody);
  }

  @Post('/login')
  login(@Body() requestBody: LoginUserDto) {
    return this.authService.login(requestBody);
  }

}