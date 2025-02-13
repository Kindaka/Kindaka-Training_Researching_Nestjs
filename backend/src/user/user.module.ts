import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1d' },
  }),
], // Đảm bảo import entity
  providers: [UserService, AuthService], // Đảm bảo UserService được khai báo ở đây
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

}
