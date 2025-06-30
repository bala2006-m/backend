import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class HolidaysService {
  constructor(private readonly prisma: PrismaService) {}

  async getHolidaysByClass(schoolId: string, classId: string) {
    try {
      const holidays = await this.prisma.$queryRawUnsafe(
        `
        SELECT DISTINCT date, reason, fn, an
        FROM holidays
        WHERE school_id = ?
          AND FIND_IN_SET(?, class_ids) > 0
        ORDER BY date ASC
        `,
        schoolId,
        classId,
      ) as { date: string; reason: string; fn?: string; an?: string }[];

      return {
        status: 'success',
        holidays,
      };
    } catch (error) {
      console.error('🔥 Failed to fetch holidays:', error);
      throw new InternalServerErrorException('Database query failed');
    }
  }
}
