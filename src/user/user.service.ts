import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './models/user.model';
import { genSalt, hash, compare } from 'bcrypt';
import { WRONG_CREDENTIALS } from './const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create({ email, password }: AuthDto): Promise<UserDocument> {
    const salt = await genSalt(10);
    const user = new this.userModel({
      email,
      passwordHash: await hash(password, salt),
    });
    return user.save();
  }

  async find(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async validateUser({
    email,
    password,
  }: AuthDto): Promise<Pick<User, 'email'>> {
    const user = await this.find(email);
    if (!user) throw new UnauthorizedException(WRONG_CREDENTIALS);

    const isPasswordCorrect = await compare(password, user.passwordHash);
    if (!isPasswordCorrect) throw new UnauthorizedException(WRONG_CREDENTIALS);
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
