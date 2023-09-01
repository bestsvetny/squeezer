import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
}
