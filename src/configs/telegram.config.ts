import { ConfigService } from '@nestjs/config';
import { TelegrafBotOptions } from '../telegram/types';

export const initTelegrafConfig = (
  configService: ConfigService,
): TelegrafBotOptions => {
  const token = configService.get('TELEGRAM_TOKEN') as string | undefined;
  if (!token) throw new Error('No Telegram token');
  const chatId =
    (configService.get('TELEGRAM_CHAT_ID') as string | undefined) ?? '';

  return {
    chatId,
    token,
  };
};
