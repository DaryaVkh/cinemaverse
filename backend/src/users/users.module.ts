import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from '../films/films.module';
import { AuthorizationMiddlewareModule } from '../middlewares/authorization/authorization-middleware.module';
import { User, UserSchema } from './user.entity';
import { UsersController } from './users.contoller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthorizationMiddlewareModule,
    FilmsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
