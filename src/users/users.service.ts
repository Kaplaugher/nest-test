import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  email: string;
};

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'INTERN', email: 'asfdasf@adsf.com' },
    { id: 2, name: 'Jane Doe', role: 'ENGINEER', email: 'jane@asfasf.com' },
    { id: 3, name: 'Bignles', role: 'ADMIN', email: 'asfa@asfas.com' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: User) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = { ...user, id: usersByHighestId[0].id + 1 };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: User) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user;
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
