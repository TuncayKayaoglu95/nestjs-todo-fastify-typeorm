import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'enterprise', // PostgreSQL kullanıcı adı
      password: 'enterprise', // PostgreSQL şifre
      database: 'todo_db', // Veritabanı adı
      autoLoadEntities: true, // TypeORM ile oluşturulan tüm entity'leri otomatik olarak yükler
      synchronize: true, // Otomatik veritabanı senkronizasyonu (sadece geliştirme için)
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
