import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService, TokenPayload } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from './decorators/user.decorator';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  signIn(@Body() body: LoginDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@User() user: TokenPayload) {
    return user;
  }
}
