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
import { RolesGuard } from 'src/guards/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor) // Thg trên và dưới đều giống nhau chỉ khác mỗi ở trên là xài có sẵn phân biệt bằng @Exclude trong entity
@UseInterceptors(LoggingInterceptor) // Còn thg dưới là custom 
// Ghi Log Request & Response dữ liệu, Ẩn Thông Tin Nhạy Cảm (Password), Chuẩn Hóa Lỗi API 
export class UserController {
  constructor(private readonly userService: UserService, 
              private readonly authService: AuthService) {}

  @Get()
  @UseGuards(new  RolesGuard(['user','admin','mod'])) // Đây là guard để kiểm tra xem user có quyền truy cập hay không
  // Chỉ cho phép user và admin truy cập vào được và không phải kiểm tra hành động của user hoặc admin
  // Để kiểm tra hành động của user hoặc admin thì qua hàm update (PUT)
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng', type: [UserEntity] })
  @UseGuards(AuthGuard)
  findAll(): Promise<UserEntity[]> {
    console.log('Request from controller!');
    return this.userService.findAll();
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  getCurrentUser(@CurrentUser() currentUser: UserEntity){
    return currentUser;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết của user', type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }


  @Put('/:id')
  @UseGuards(new  RolesGuard(['user','admin','mod'])) 
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() user: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity
  ){
    console.log('Request body from client:', user);
    return this.userService.update(id, user, currentUser);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @UseGuards(new  RolesGuard(['user','admin','mod'])) 
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, 
  @CurrentUser() currentUser: UserEntity) {
    return this.userService.remove(id, currentUser);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  register(@Body() requestBody: RegisterUserDto) {
    return this.authService.register(requestBody);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Đăng nhập' })
  login(@Body() requestBody: LoginUserDto) {
    return this.authService.login(requestBody);
  }

}