import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ClassTimetableService {
  constructor(private prisma: PrismaService) {}

  async saveTimetables(data: string) {
    const lines = data
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const entries = lines.map((line) => {
      const [school_id, class_id, dayOfWeek, periodNumberStr, ...subjectParts] = line.split(' ');
      const periodNumber = parseInt(periodNumberStr, 10);
      const subject = subjectParts.join(' ');

      return {
        school_id,
        class_id,
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

  async getTimetable(schoolId: number, classId: number) {
    const rows: any[] = await this.prisma.$queryRawUnsafe(
      `
      SELECT dayOfWeek, periodNumber, subject
      FROM ClassTimetable
      WHERE school_id = ? AND class_id = ?
      ORDER BY
        FIELD(dayOfWeek, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
        periodNumber ASC
    `,
      schoolId,
      classId,
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

  async findByClass(school_id: string, class_id: string) {
    return this.prisma.classTimetable.findMany({
      where: {
        school_id,
        class_id,
      },
      orderBy: {
        periodNumber: 'asc',
      },
    });
  }
}
