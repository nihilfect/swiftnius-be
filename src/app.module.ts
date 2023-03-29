import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [ConfigModule.forRoot(),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        projectId: configService.get<string>('PROJECT_ID'), 
      }),
      inject: [ConfigService],
    }),
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
