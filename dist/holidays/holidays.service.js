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
exports.HolidaysService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let HolidaysService = class HolidaysService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addHoliday(dto) {
        try {
            const existing = await this.prisma.holidays.findFirst({
                where: {
                    date: new Date(dto.date),
                    school_id: dto.school_id,
                },
            });
            if (existing) {
                throw new common_1.ConflictException('Holiday already exists for this date');
            }
            const holiday = await this.prisma.holidays.create({
                data: {
                    date: new Date(dto.date),
                    reason: dto.reason,
                    school_id: dto.school_id,
                    class_ids: dto.class_ids,
                    fn: dto.fn,
                    an: dto.an,
                },
            });
            return {
                status: 'success',
                holiday,
            };
        }
        catch (error) {
            console.error('❌ Failed to create holiday:', error);
            throw new common_1.InternalServerErrorException('Could not create holiday');
        }
    }
    async fetchHolidays(school_id) {
        const schoolIdInt = Number(school_id);
        const holidays = await this.prisma.holidays.findMany({
            where: {
                school_id: schoolIdInt,
            },
            select: {
                date: true,
                reason: true,
                class_ids: true,
                fn: true,
                an: true,
                classes: {
                    select: {
                        id: true,
                        class: true,
                        section: true,
                    },
                },
            },
            orderBy: {
                date: 'asc',
            },
        });
        return {
            status: 'success',
            holidays,
        };
    }
    async getHolidaysByClass(schoolId, classId) {
        try {
            const holidays = await this.prisma.$queryRawUnsafe(`
        SELECT DISTINCT date, reason, fn, an
        FROM holidays
        WHERE school_id = ?
          AND JSON_CONTAINS(class_ids, ?, '$')
        ORDER BY date ASC
        `, Number(schoolId), JSON.stringify(Number(classId)));
            return {
                status: 'success',
                holidays,
            };
        }
        catch (error) {
            console.error('🔥 Failed to fetch holidays:', error);
            throw new common_1.InternalServerErrorException('Database query failed');
        }
    }
    async deleteHoliday(dto) {
        const result = await this.prisma.holidays.deleteMany({
            where: {
                date: new Date(dto.date),
                school_id: dto.school_id,
            },
        });
        if (result.count === 0) {
            throw new common_1.NotFoundException('Holiday not found');
        }
        return { status: 'success', message: 'Holiday removed' };
    }
};
exports.HolidaysService = HolidaysService;
exports.HolidaysService = HolidaysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HolidaysService);
//# sourceMappingURL=holidays.service.js.map