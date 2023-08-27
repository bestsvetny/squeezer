import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
    async create(dto: CreateRoleDto) {
        return this.roleRepository.create(dto);
    }

    async findOneByValue(value: string): Promise<Role> {
        return this.roleRepository.findOne({
            where: {
                value
            }
        });
    }
}
