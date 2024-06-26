import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '@decorator/routes-public.decorator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('autrh')
  @Public()
  @Post('/login')
  login(@Body() createAuthDto: AuthDto) {
    return this.authService.login(createAuthDto);
  }
}
