import { Module } from '@nestjs/common';
import { getDataSource } from '@core/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/user/user.module';
import { ModuleModule } from '@modules/module/module.module';
import { MarathonModule } from '@modules/marathon/marathon.module';
import { AchievementModule } from '@modules/achievement/achievement.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'process';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as path from 'path';
import { NoteModule } from '@modules/note/note.module';
import { TopicModule } from '@modules/topic/topic.module';
import { MailService } from '@mail/service';
import { TrainerModule } from '@modules/trainer/trainer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as rootPath } from 'app-root-path';
import { TrainerStaticController } from './trainer-static.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppModule.getDatabaseConfig();
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      expandVariables: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: path.resolve(__dirname, 'mail', 'templates'),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(rootPath, 'src', 'static'),
      serveRoot: '/static',
    }),

    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    UserModule,
    ModuleModule,
    MarathonModule,
    AchievementModule,
    NoteModule,
    TopicModule,
    TrainerModule,
  ],
  controllers: [TrainerStaticController],
  providers: [MailService],
})
export class AppModule {
  public static getDatabaseConfig(): unknown {
    return {
      ...getDataSource(
        process.env.HOST,
        process.env.PASSWORD,
        process.env.DB_NAME,
      ).options,
      autoLoadEntities: true,
    };
  }
}
