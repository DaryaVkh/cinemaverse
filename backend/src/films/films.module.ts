import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizationMiddlewareModule } from '../middlewares/authorization/authorization-middleware.module';
import { Comment, CommentSchema } from './comment.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    HttpModule,
    ConfigModule,
    AuthorizationMiddlewareModule,
  ],
  exports: [FilmsService],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
