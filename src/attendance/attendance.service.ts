import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto'; // if needed
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
import { Prisma } from '@prisma/client';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { StudentAttendance } from './student-attendance.entity';
@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

async checkAttendanceExists(schoolId: string, classId: string, date: string): Promise<boolean> {
  try {
    const exists = await this.prisma.studentAttendance.findFirst({
      where: {
        school_id: Number(schoolId),
        class_id: Number(classId),
        date: new Date(date),
      },
    });
    return !!exists;
  } catch (error) {
    throw new InternalServerErrorException('Database query failed');
  }
}


async fetchAttendanceByClassId(class_id: string, school_id: string, username: string) {

  return this.prisma.$queryRaw<
    Array<{ date: Date; fn_status: string; an_status: string }>
  >(Prisma.sql`
    SELECT date, fn_status, an_status
    FROM studentAttendance
    WHERE class_id = ${class_id} AND school_id = ${school_id} AND username = ${username}
  `);
}

 async markStudentAttendance(dto: CreateAttendanceDto) {
const { username, date, session, status, school_id ,class_id} = dto;
  const column = session === 'FN' ? 'fn_status' : 'an_status';

 const query = `
   INSERT INTO studentAttendance(username, date, ${column}, school_id, class_id)
   VALUES (?, ?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE ${column} = VALUES(${column})
 `;


  await this.prisma.$executeRawUnsafe(query, username, date, status, school_id,class_id);

  return { status: 'success', message: 'Student attendance recorded' };
}

async getStudentAttendance(date?: string, schoolId?: string) {
  if (!schoolId) return [];

  const whereCondition: any = {
    school_id: parseInt(schoolId),  // ✅ Convert to integer
  };

  if (date) {
    whereCondition.date = new Date(date);
  }


  const records = await this.prisma.studentAttendance.findMany({
    where: whereCondition,
    select: {
      username: true,
      date: true,
      fn_status: true,
      an_status: true,
    },
  });

  return records;
}



  async getAttendanceByClassAndDate(class_id: string, date: string,school_id:string) {
    const results = await this.prisma.$queryRawUnsafe<any[]>(`
      SELECT s.username, s.name, sa.fn_status, sa.an_status
      FROM student s
      LEFT JOIN studentAttendance sa
        ON s.username = sa.username AND sa.date = ?
      WHERE s.class_id = ? and s.school_id= ?
      ORDER BY s.name ASC
    `, date, class_id,school_id);

    return {
      status: 'success',
      count: results.length,
      attendance: results,
    };
  }
async getMonthlySummary(username: string, month: number, year: number) {
  const fromDate = new Date(year, month - 1, 1); // JS months = 0-based
  const toDate = new Date(year, month, 0); // Last day of the month

  const records = await this.prisma.studentAttendance.findMany({
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
  const record = await this.prisma.studentAttendance.findUnique({
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

  const result = await this.prisma.$executeRawUnsafe(
    `
    INSERT INTO staffAttendance (username, date, ${column}, school_id)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE ${column} = VALUES(${column})
    `,
    username,
    date,
    status,
    school_id
  );

  return { status: 'success', message: 'Staff attendance recorded' };
}

async getStaffDailySummary(username: string, date: string) {
  const record = await this.prisma.staffAttendance.findUnique({
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

  const records = await this.prisma.staffAttendance.findMany({
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
 async fetchAttendance(date?: string, schoolId?: string) {
    let whereClause = {};

    if (date && schoolId) {
      whereClause = {
        date: new Date(date),
        school_id: Number(schoolId),
      };
    }

    const attendance = await this.prisma.staffAttendance.findMany({
      where: whereClause,
      select: {
        username: true,
        date: true,
        fn_status: true,
        an_status: true,
      },
    });

    return {
      status: 'success',
      staff: attendance,
    };

  }
  // attendance.service.ts

  async getAbsentees(
    date: Date,
    schoolId: number,
    classId: number,
    sessionField: 'fn_status' | 'an_status',
  ): Promise<string[]> {
    const absentees = await this.prisma.studentAttendance.findMany({
      where: {
        date,
        school_id: schoolId,
        class_id: classId,
        [sessionField]: 'A',
      },
      select: {
        username: true,
      },
    });

    return absentees.map((a) => a.username);
  }

}
