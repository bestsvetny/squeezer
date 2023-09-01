import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from 'src/auth/dto/registration.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    generateJwtToken(data: { username: string; _id: number }) {
        const payload = { username: data.username, sub: data._id };
        return this.jwtService.sign(payload);
    }

    async login(user: any) {
        const token = this.generateJwtToken({ username: user.username, _id: user.id });
        return {
            id: user.id,
            username: user.username,
            access_token: token
        };
    }

    async registration(dto: RegistrationDto) {
        try {
            const user = await this.usersService.create(dto);
            console.log('user', user);
            const { username, id } = user;
            return {
                id,
                username,
                token: this.generateJwtToken({ username: user.username, _id: user.id })
            };
        } catch (e) {
            throw new ForbiddenException('Registration error');
        }
    }
}
