import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('1️⃣ Đang kiểm tra AuthGuard...');

    try {
      // 1️⃣ Kiểm tra Authorization Header
      const authHeader = request.headers.authorization;
      console.log('🛠 Authorization Header:', authHeader);
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ForbiddenException('Token không hợp lệ hoặc thiếu');
      }
      const token = authHeader.split(' ')[1];
      console.log('🔑 Token nhận được:', token);

      // 2️⃣ Kiểm tra JWT_SECRET
      console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET không được định nghĩa');
      }

      // 3️⃣ Verify Token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('✅ Token Payload:', payload);

      // 4️⃣ Kiểm tra user từ database
      const user = await this.userService.findByEmail(payload.email);
      console.log('👤 User found:', user);
      if (!user) {
        throw new BadRequestException('User không phù hợp với token');
      }

      // 5️⃣ Gán user vào request
      request.currentUser = user;
      return true;

    } catch (error) {
      console.error('❌ Lỗi AuthGuard:', error.message);
      throw new ForbiddenException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
