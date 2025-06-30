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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(school_id, date) {
        const d = new Date(date);
        const totalStudents = await this.prisma.student.count({ where: { school_id: Number(school_id) }
        });
        const studentAttendance = await this.prisma.student_attendance.groupBy({
            by: ['fn_status', 'an_status'],
            where: { school_id, date: d },
            _count: true,
        });
        const totalStaff = await this.prisma.staff.count({ where: { school_id } });
        const staffAttendance = await this.prisma.staff_attendance.groupBy({
            by: ['fn_status', 'an_status'],
            where: { school_id, date: d },
            _count: true,
        });
        const countStatus = (group, status, session) => group
            .filter((g) => g[`${session}_status`] === status)
            .reduce((acc, g) => acc + g._count, 0);
        return {
            status: 'success',
            school_id,
            date,
            summary: {
                students: {
                    total: totalStudents,
                    fn_present: countStatus(studentAttendance, 'P', 'fn'),
                    fn_absent: countStatus(studentAttendance, 'A', 'fn'),
                    an_present: countStatus(studentAttendance, 'P', 'an'),
                    an_absent: countStatus(studentAttendance, 'A', 'an'),
                },
                staff: {
                    total: totalStaff,
                    fn_present: countStatus(staffAttendance, 'P', 'fn'),
                    fn_absent: countStatus(staffAttendance, 'A', 'fn'),
                    an_present: countStatus(staffAttendance, 'P', 'an'),
                    an_absent: countStatus(staffAttendance, 'A', 'an'),
                },
            },
        };
    }
    async getClassSummary(school_id, date) {
        const d = new Date(date);
        const classGroups = await this.prisma.student.groupBy({
            by: ['class_id'],
            where: { school_id: Number(school_id) },
            _count: { id: true },
        });
        const attendance = await this.prisma.student_attendance.groupBy({
            by: ['class_id', 'fn_status', 'an_status'],
            where: { school_id, date: d },
            _count: true,
        });
        const buildClassSummary = (class_id) => {
            const total = classGroups.find((c) => c.class_id === Number(class_id))?._count.id ?? 0;
            const fnPresent = attendance
                .filter((a) => a.class_id === class_id && a.fn_status === 'P')
                .reduce((acc, a) => acc + a._count, 0);
            const fnAbsent = attendance
                .filter((a) => a.class_id === class_id && a.fn_status === 'A')
                .reduce((acc, a) => acc + a._count, 0);
            const anPresent = attendance
                .filter((a) => a.class_id === class_id && a.an_status === 'P')
                .reduce((acc, a) => acc + a._count, 0);
            const anAbsent = attendance
                .filter((a) => a.class_id === class_id && a.an_status === 'A')
                .reduce((acc, a) => acc + a._count, 0);
            return {
                class_id,
                total_students: total,
                fn_present: fnPresent,
                fn_absent: fnAbsent,
                an_present: anPresent,
                an_absent: anAbsent,
            };
        };
        const summary = classGroups.map((g) => buildClassSummary(g.class_id.toString()));
        return {
            status: 'success',
            school_id,
            date,
            summary,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map