import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from 'src/roles/user-roles.model';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
    exports: [RolesService]
})
export class RolesModule {}
