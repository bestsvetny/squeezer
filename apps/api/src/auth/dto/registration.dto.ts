import { Length } from 'class-validator';

export class RegistrationDto {
    @Length(6, 32)
    readonly username: string;

    @Length(6, 32)
    readonly password: string;
}
