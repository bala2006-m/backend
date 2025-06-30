import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ClassTimetableService {
  constructor(private prisma: PrismaService) {}

  async getTimetable(schoolId: string, classId: string) {
    const rows: any[] = await this.prisma.$queryRawUnsafe(`
      SELECT day_of_week AS "dayOfWeek", period_number AS "periodNumber", subject
      FROM timetables
      WHERE school_id = ? AND class_id = ?
      ORDER BY
        FIELD(day_of_week, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
        period_number ASC
    `, schoolId, classId);


    const grouped: Record<string, any[]> = {};
    for (const row of rows) {
      if (!grouped[row.dayOfWeek]) {
        grouped[row.dayOfWeek] = [];
      }
      grouped[row.dayOfWeek].push({
        period: row.periodNumber,
        subject: row.subject,
        session: row.periodNumber <= 4 ? 'FN' : 'AN',
      });
    }

    return grouped;
  }
}
