import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log(process.env.MONGODB_URL);

        return {
          uri: process.env.MONGODB_URL,
          dbName: 'spacody',
          autoIndex: true,
        };
      },
    }),
    PostModule,
    AuthModule,
    SharedModule,
    UsersModule,
    HashModule,
    EmailModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
