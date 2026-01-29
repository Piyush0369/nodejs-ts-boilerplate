import prisma from '../config/database';
import type { User } from '.prisma/client';

export interface CreateUserDto {
  email: string;
  name?: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}

export class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User | null> {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
