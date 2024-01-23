import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDataSource } from './core/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
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
