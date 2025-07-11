import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { DayOfWeek } from '@prisma/client';

@Injectable()
export class ClassTimetableService {
  constructor(private prisma: PrismaService) {}

  async saveTimetables(data: string) {
    const lines = data
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const entries = lines.map((line) => {
      const [schoolIdStr, classesIdStr, dayOfWeekRaw, periodNumberStr, ...subjectParts] = line.split(' ');

      const schoolId = parseInt(schoolIdStr, 10);
      const classesId = parseInt(classesIdStr, 10);
      const periodNumber = parseInt(periodNumberStr, 10);
      const subject = subjectParts.join(' ');

      // Ensure dayOfWeek is a valid enum
      const dayOfWeek = dayOfWeekRaw as DayOfWeek;

      return {
        schoolId,
        classesId,
        dayOfWeek,
        periodNumber,
        subject,
      };
    });

    await this.prisma.classTimetable.createMany({
      data: entries,
      skipDuplicates: true,
    });

    return { success: true, count: entries.length };
  }

  async getTimetable(schoolId: number, classesId: number) {
    const rows: any[] = await this.prisma.$queryRawUnsafe(
      `
      SELECT dayOfWeek, periodNumber, subject
      FROM ClassTimetable
      WHERE schoolId = ? AND classesId = ?
      ORDER BY
        FIELD(dayOfWeek, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
        periodNumber ASC
      `,
      schoolId,
      classesId,
    );

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

  async findByClass(schoolId: number, classesId: number) {
    return this.prisma.classTimetable.findMany({
      where: {
        schoolId,
        classesId,
      },
      orderBy: {
        periodNumber: 'asc',
      },
    });
  }
}
