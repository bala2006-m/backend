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
exports.ClassTimetableService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ClassTimetableService = class ClassTimetableService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveTimetables(data) {
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
            const dayOfWeek = dayOfWeekRaw;
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
    async getTimetable(schoolId, classesId) {
        const rows = await this.prisma.$queryRawUnsafe(`
      SELECT dayOfWeek, periodNumber, subject
      FROM ClassTimetable
      WHERE schoolId = ? AND classesId = ?
      ORDER BY
        FIELD(dayOfWeek, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
        periodNumber ASC
      `, schoolId, classesId);
        const grouped = {};
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
    async findByClass(schoolId, classesId) {
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
};
exports.ClassTimetableService = ClassTimetableService;
exports.ClassTimetableService = ClassTimetableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassTimetableService);
//# sourceMappingURL=class-timetable.service.js.map