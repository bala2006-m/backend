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
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkAttendanceExists(schoolId, classId, date) {
        try {
            const exists = await this.prisma.studentAttendance.findFirst({
                where: {
                    school_id: Number(schoolId),
                    class_id: Number(classId),
                    date: new Date(date),
                },
            });
            return !!exists;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Database query failed');
        }
    }
    async fetchAttendanceByClassId(class_id, school_id, username) {
        return this.prisma.studentAttendance.findMany({
            where: {
                class_id: Number(class_id),
                school_id: Number(school_id),
                username,
            },
            select: {
                date: true,
                fn_status: true,
                an_status: true,
            },
            orderBy: { date: 'asc' },
        });
    }
    async markStudentAttendance(dto) {
        const { username, date, session, status, school_id, class_id } = dto;
        const column = session === 'FN' ? 'fn_status' : 'an_status';
        const existing = await this.prisma.studentAttendance.findUnique({
            where: {
                username_date: {
                    username,
                    date: new Date(date),
                },
            },
        });
        if (existing) {
            await this.prisma.studentAttendance.update({
                where: {
                    username_date: {
                        username,
                        date: new Date(date),
                    },
                },
                data: {
                    [column]: status,
                },
            });
        }
        else {
            await this.prisma.studentAttendance.create({
                data: {
                    username,
                    date: new Date(date),
                    [column]: status,
                    school_id: Number(school_id),
                    class_id: Number(class_id),
                },
            });
        }
        return { status: 'success', message: 'Student attendance recorded' };
    }
    async getStudentAttendance(date, schoolId) {
        if (!schoolId)
            return [];
        const whereCondition = {
            school_id: parseInt(schoolId),
        };
        if (date) {
            whereCondition.date = new Date(date);
        }
        return this.prisma.studentAttendance.findMany({
            where: whereCondition,
            select: {
                username: true,
                date: true,
                fn_status: true,
                an_status: true,
            },
        });
    }
    async getAttendanceByClassAndDate(class_id, date, school_id) {
        const students = await this.prisma.student.findMany({
            where: {
                class_id: Number(class_id),
                school_id: Number(school_id),
            },
            select: {
                username: true,
                name: true,
            },
            orderBy: { name: 'asc' },
        });
        const attendanceRecords = await this.prisma.studentAttendance.findMany({
            where: {
                class_id: Number(class_id),
                school_id: Number(school_id),
                date: new Date(date),
            },
        });
        const attendance = students.map((student) => {
            const record = attendanceRecords.find((att) => att.username === student.username);
            return {
                username: student.username,
                name: student.name,
                fn_status: record?.fn_status ?? null,
                an_status: record?.an_status ?? null,
            };
        });
        return {
            status: 'success',
            count: attendance.length,
            attendance,
        };
    }
    async getMonthlySummary(username, month, year) {
        const fromDate = new Date(year, month - 1, 1);
        const toDate = new Date(year, month, 0);
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
    async getDailySummary(username, date) {
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
    async markStaffAttendance(dto) {
        const { username, date, session, status, school_id } = dto;
        const column = session === 'FN' ? 'fn_status' : 'an_status';
        const existing = await this.prisma.staffAttendance.findUnique({
            where: {
                username_date: {
                    username,
                    date: new Date(date),
                },
            },
        });
        if (existing) {
            await this.prisma.staffAttendance.update({
                where: {
                    username_date: {
                        username,
                        date: new Date(date),
                    },
                },
                data: {
                    [column]: status,
                },
            });
        }
        else {
            await this.prisma.staffAttendance.create({
                data: {
                    username,
                    date: new Date(date),
                    [column]: status,
                    school_id: Number(school_id),
                },
            });
        }
        return { status: 'success', message: 'Staff attendance recorded' };
    }
    async getStaffDailySummary(username, date) {
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
    async getStaffMonthly(username, month, year) {
        const from = new Date(year, month - 1, 1);
        const to = new Date(year, month, 0);
        const records = await this.prisma.staffAttendance.findMany({
            where: {
                username,
                date: {
                    gte: from,
                    lte: to,
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
            username,
            month,
            year,
            records,
        };
    }
    async fetchAttendance(date, schoolId) {
        const whereClause = {};
        if (date)
            whereClause.date = new Date(date);
        if (schoolId)
            whereClause.school_id = Number(schoolId);
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
    async getAbsentees(date, schoolId, classId, sessionField) {
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map