import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('common/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async getMyRefreshToken(@Req() req: any) {
    const refreshToken = req.body?.refreshToken;
    return await this.authService.getMyRefreshToken(refreshToken);
  }
}
