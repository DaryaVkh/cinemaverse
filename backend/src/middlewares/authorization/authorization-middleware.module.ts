import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from '../../users/users.contoller';
import { AuthorizationMiddleware } from './authorization.middleware';

@Module({
  imports: [ConfigModule],
  providers: [AuthorizationMiddleware],
  exports: [AuthorizationMiddleware],
})
export class AuthorizationMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes({ path: 'films/:id/reviews', method: RequestMethod.POST });
  }
}
