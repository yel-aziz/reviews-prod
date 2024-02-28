import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';


import { ConfigService } from '@nestjs/config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {


  constructor(config: ConfigService) {
    super({
      clientID:
        'u-s4t2ud-932dbed8852b3b88a076c028c360e4b7cf0c9d6041abc29bbc569d2e9c689527',
      clientSecret:
        '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',
      callbackURL: 'http://leetreviews.com/42/oauth',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    done: Function,
  ): Promise<any> {
    try {
      accessToken;
      refreshToken;
      const user = {
        email: profile.emails[0].value,
        avatar: profile._json.image.link,
        username: profile.username,
      };
      if (user == undefined || user == null) {
        throw new BadRequestException();
      }
      done(null, user);
    } catch (error) {
      throw new BadRequestException({
        statusCode: 403,
        message: 'error login Or sign up try again',
      });
    }
  }
}
