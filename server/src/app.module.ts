import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { getDataSource } from './core/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

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
  ],
  providers: [AppService],
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
