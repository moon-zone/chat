import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthMiddleware } from './auth.middleware';
import { UserSchema } from './user/schema/user.schema';
const path = require('path');
require('dotenv').config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'client/build'),
    }),
    UserModule,
    MessageModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [ChatGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/login', 'api/register')
      .forRoutes('api');
  }
}
