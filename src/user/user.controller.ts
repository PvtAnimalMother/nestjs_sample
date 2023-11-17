import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';
import { USER_ALREADY_EXISTS } from './const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) dto: AuthDto) {
    const sameEmailUser = await this.userService.find(dto.email);
    if (sameEmailUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
    return await this.userService.create(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body(new ValidationPipe()) dto: AuthDto) {
    const { email } = await this.userService.validateUser(dto);
    return await this.userService.login(email);
  }
}
