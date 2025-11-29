import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'api-service',
  entities: [User],
  synchronize: true, // ONLY DEV
};