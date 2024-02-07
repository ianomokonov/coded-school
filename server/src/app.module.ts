import { Module } from '@nestjs/common';
import { getDataSource } from './core/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ModuleModule } from './modules/module/module.module';
import { MarathonModule } from './modules/marathon/marathon.module';
import { AchievementModule } from './modules/achievement/achievement.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppModule.getDatabaseConfig();
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    // AutomapperModule.forRoot([
    //   {
    //     name: 'classes',
    //     strategyInitializer: classes(),
    //   },
    // ]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    UserModule,
    ModuleModule,
    MarathonModule,
    AchievementModule,
  ],
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
