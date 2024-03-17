import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Invalid role' })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
