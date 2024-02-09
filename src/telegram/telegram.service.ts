import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TelegrafBotOptions } from './types';
import { TELEGRAM_MODULE_OPTIONS } from './const';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: TelegrafBotOptions;
  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegrafBotOptions) {
    this.options = options;
    this.bot = new Telegraf(options.token);
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
