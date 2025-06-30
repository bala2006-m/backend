"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const client_1 = require("@prisma/client");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchAttendanceByClassId(class_id, school_id, username) {
        return this.prisma.$queryRaw(client_1.Prisma.sql `
    SELECT date, fn_status, an_status
    FROM student_attendance
    WHERE class_id = ${class_id} AND school_id = ${school_id} AND username = ${username}
  `);
    }
    async markStudentAttendance(dto) {
    }
    async getAttendanceByClassAndDate(class_id, date) {
        const results = await this.prisma.$queryRawUnsafe(`
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
    async getMonthlySummary(username, month, year) {
        const fromDate = new Date(year, month - 1, 1);
        const toDate = new Date(year, month, 0);
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
    async getDailySummary(username, date) {
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
    async markStaffAttendance(dto) {
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
    async getStaffDailySummary(username, date) {
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
    async getStaffMonthly(username, month, year) {
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map