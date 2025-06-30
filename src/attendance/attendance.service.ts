import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto'; // if needed
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}
async fetchAttendanceByClassId(class_id: string, school_id: string, username: string) {

  return this.prisma.$queryRaw<
    Array<{ date: Date; fn_status: string; an_status: string }>
  >(Prisma.sql`
    SELECT date, fn_status, an_status
    FROM student_attendance
    WHERE class_id = ${class_id} AND school_id = ${school_id} AND username = ${username}
  `);
}  async markStudentAttendance(dto: CreateAttendanceDto) {
    // your code here
  }
  async getAttendanceByClassAndDate(class_id: string, date: string) {
    const results = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT s.username, s.name, sa.fn_status, sa.an_status
      FROM student s
      LEFT JOIN student_attendance sa
        ON s.username = sa.username AND sa.date = ?
      WHERE s.class_id = ?
      ORDER BY s.name ASC
    `, date, class_id);

    return {
      status: 'success',
      count: results.length,
      attendance: results,
    };
  }
async getMonthlySummary(username: string, month: number, year: number) {
  const fromDate = new Date(year, month - 1, 1); // JS months = 0-based
  const toDate = new Date(year, month, 0); // Last day of the month

  const records = await this.prisma.student_attendance.findMany({
    where: {
      username,
      date: {
        gte: fromDate,
        lte: toDate,
      },
    },
    select: {
      date: true,
      fn_status: true,
      an_status: true,
    },
    orderBy: { date: 'asc' },
  });

  return {
    status: 'success',
    count: records.length,
    month,
    year,
    records,
  };
}
async getDailySummary(username: string, date: string) {
  const record = await this.prisma.student_attendance.findUnique({
    where: {
      username_date: {
        username,
        date: new Date(date),
      },
    },
    select: {
      fn_status: true,
      an_status: true,
    },
  });

  return {
    status: 'success',
    date,
    username,
    record: record ?? { fn_status: null, an_status: null },
  };
}
async markStaffAttendance(dto: CreateStaffAttendanceDto) {
  const { username, date, session, status, school_id } = dto;
  const column = session === 'FN' ? 'fn_status' : 'an_status';

  const query = `
    INSERT INTO staff_attendance (username, date, ${column}, school_id)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE ${column} = VALUES(${column})
  `;

  await this.prisma.$executeRawUnsafe(query, username, date, status, school_id);

  return { status: 'success', message: 'Staff attendance recorded' };
}
async getStaffDailySummary(username: string, date: string) {
  const record = await this.prisma.staff_attendance.findUnique({
    where: {
      username_date: {
        username,
        date: new Date(date),
      },
    },
    select: {
      fn_status: true,
      an_status: true,
    },
  });

  return {
    status: 'success',
    date,
    username,
    record: record ?? { fn_status: null, an_status: null },
  };
}
async getStaffMonthly(username: string, month: number, year: number) {
  const from = new Date(year, month - 1, 1);
  const to = new Date(year, month, 0);

  const records = await this.prisma.staff_attendance.findMany({
    where: {
      username,
      date: { gte: from, lte: to },
    },
    select: {
      date: true,
      fn_status: true,
      an_status: true,
    },
    orderBy: { date: 'asc' },
  });

  return {
    status: 'success',
    username,
    month,
    year,
    records,
  };
}

}
