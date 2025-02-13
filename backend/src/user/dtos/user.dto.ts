import { IsEmail, IsNotEmpty, MinLength, IsString, Matches, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value.trim()) 
  email: string;

  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @IsString({ message: 'Họ và tên phải là chuỗi' })
  fullName: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số',
  })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số',
  })
  password?: string;
}
