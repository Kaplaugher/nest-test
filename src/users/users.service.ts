import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'INTERN', email: 'asfdasf@adsf.com' },
    { id: 2, name: 'Jane Doe', role: 'ENGINEER', email: 'jane@asfasf.com' },
    { id: 3, name: 'Bignles', role: 'ADMIN', email: 'asfa@asfas.com' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('Role not found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    return (
      this.users.find((user) => user.id === id) ||
      new NotFoundException('User not found')
    );
  }

  create(user: CreateUserDto) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = { ...user, id: usersByHighestId[0].id + 1 };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, UpdateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...UpdateUserDto } : user,
    );
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
