import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';
import { RolesService } from 'src/roles/roles.service';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {}
    async create(dto: RegistrationDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepository.create({ username: dto.username, password: hash });
        const role = await this.rolesService.findOneByValue('USER');
        await (await user).$set('roles', [role.id]);
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll({ include: { all: true } });
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                id
            }
        });
    }

    async findByUsername(username: string): Promise<User> {
        const data = await this.userRepository.findOne({
            where: {
                username
            }
        });
        return data.dataValues;
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
