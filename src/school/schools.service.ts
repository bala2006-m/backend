import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.school.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        photo: true, // assuming this is a `Bytes` field in your Prisma schema
      },
    });
  }
}
