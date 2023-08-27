import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

// TODO: dto validation
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/registration')
    registration(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto);
    }
}
