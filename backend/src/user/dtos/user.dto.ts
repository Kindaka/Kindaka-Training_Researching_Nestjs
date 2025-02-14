import { IsEmail, IsNotEmpty, MinLength, IsString, Matches, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ROLES } from 'src/entity/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {

  @ApiProperty({ example: 'test@gmail.com', description: 'Email của người dùng' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value.trim()) 
  email: string;

  @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên người dùng' })
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  fullName: string;

  @ApiProperty({ example: 'String123', description: 'Mật khẩu (tối thiểu 6 ký tự, có chữ hoa, chữ thường và số)' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số',
  })
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'test2@gmail.com', description: 'Email mới' })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiPropertyOptional({ example: 'Nguyen Van B', description: 'Tên mới' })
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({ example: 'NewPassword123', description: 'Mật khẩu mới' })
  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'ADMIN, MOD, USER', description: 'Chỉ định quyền người dùng (Optinal-Default: USER)' })
  @IsOptional()
  role: ROLES;

}
