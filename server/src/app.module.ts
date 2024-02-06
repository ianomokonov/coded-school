import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { getDataSource } from './core/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ModuleModule } from './modules/module/module.module';
import { MarathonModule } from './modules/marathon/marathon.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/user/guards/roles.guard';

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
    UserModule,
    ModuleModule,
    MarathonModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
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
