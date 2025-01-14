import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { TodoModule } from './todo/todo.module';
import { DataSourceOptions, DataSource } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options: DataSourceOptions = {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'enterprise',
          password: 'enterprise',
          database: 'todos',
          synchronize: true,
          entities: [Todo],
        };

        await createDatabase({ options });

        return options;
      },
    }),
    TodoModule,
  ],
})
export class AppModule {}
