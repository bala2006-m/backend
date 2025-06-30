import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch a specific class by school ID and class ID
  async getClassData(schoolId: number, classId: number) {
    return this.prisma.classes.findFirst({
      where: {
        id: classId,
        school_id: schoolId,
      },
      select: {
        class: true,
        section: true,
      },
    });
  }


  async fetchClassData(schoolId: number) {
    return this.prisma.classes.findMany({
      where: {
        school_id: schoolId,
      },
      select: {
        id: true,
        class: true,
        section: true,
      },
      orderBy: {
        class: 'asc',
      },
    });
  }
}
