import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const initMongoDBConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoDBConnectionString(configService),
  };
};

const getMongoDBConnectionString = (configSevice: ConfigService) => {
  const userName = configSevice.get('MONGO_DB_USER_NAME');
  const userPassword = configSevice.get('MONGO_DB_USER_PASSWORD');
  const host = configSevice.get('MONGO_DB_HOST');
  const port = configSevice.get('MONGO_DB_PORT');
  const database = configSevice.get('MONGO_DB_AUTH_DATABASE');

  return `mongodb://${userName}:${userPassword}@${host}:${port}/${database}`;
};
