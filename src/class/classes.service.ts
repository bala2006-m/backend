import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
