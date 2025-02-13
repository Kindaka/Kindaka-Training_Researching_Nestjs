
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    
    try {
      // 1) Get token from header
    const token = request.headers.authorization.split(' ')[1];
    
    if (!token) {
      throw new ForbiddenException('Vui lòng cung cấp token');
    }
    // 2) Verify token
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,

    });
    // 3) Get user from token
    const user = await this.userService.findByEmail(payload.email);
    if(!user) {
      throw new BadRequestException('User không phù hợp với token');
    }

    // 4) Set user to request
    request.currentUser = user;

    
    } catch (error) {
      throw new ForbiddenException('Token không hợp lệ hoặc đã hết hạn');
    }
    return true;
  }
}
