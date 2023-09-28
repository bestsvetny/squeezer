import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'root',
            database: process.env.POSTGRES_DB || 'postgres',
            models: [User, Role, UserRoles],
            autoLoadModels: true,
            synchronize: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ChatModule
    ]
})
export class AppModule {}
