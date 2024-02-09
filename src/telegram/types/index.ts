import { ModuleMetadata } from '@nestjs/common';

export type TelegrafBotOptions = {
  chatId: string;
  token: string;
};

export type TelegramModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & {
  useFactory: (...args: any[]) => TelegrafBotOptions;
  inject?: any[];
};
