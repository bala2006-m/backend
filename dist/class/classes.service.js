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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ClassesService = class ClassesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllClassesBySchool(schoolId) {
        return this.prisma.classes.findMany({
            where: { school_id: schoolId },
            select: {
                id: true,
                class: true,
                section: true,
            },
            orderBy: {
                class: 'asc',
            },
        });
    }
    async findClassName(classId, schoolId) {
        const cls = await this.prisma.classes.findFirst({
            where: {
                id: classId,
                school_id: schoolId,
            },
            select: {
                class: true,
                section: true,
            },
        });
        if (!cls) {
            throw new common_1.NotFoundException('Class not found for given class_id and school_id');
        }
        return {
            class: cls.class,
            section: cls.section,
        };
    }
    async addClass(dto) {
        const { class: className, section, school_id } = dto;
        const schoolIdInt = Number(school_id);
        try {
            const exists = await this.prisma.classes.findFirst({
                where: {
                    class: className,
                    section,
                    school_id: schoolIdInt,
                },
            });
            if (exists) {
                throw new common_1.ConflictException('Class already marked');
            }
            const newClass = await this.prisma.classes.create({
                data: {
                    class: className,
                    section,
                    school_id: schoolIdInt,
                },
            });
            return {
                status: 'success',
                message: 'Class added successfully',
                data: {
                    class: newClass.class,
                    section: newClass.section,
                    school_id: newClass.school_id,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Add failed: ' + error.message);
        }
    }
    async findClassId(school_id, className, section) {
        const schoolIdNum = Number(school_id);
        const classRecord = await this.prisma.classes.findFirst({
            where: {
                school_id: schoolIdNum,
                class: className,
                section: section,
            },
            select: {
                id: true,
            },
        });
        return classRecord?.id || null;
    }
    async getClassData(schoolId, classId) {
        return this.prisma.classes.findFirst({
            where: {
                id: classId,
                school_id: schoolId,
            },
            select: {
                class: true,
                section: true,
            },
        });
    }
    async fetchClassData(schoolId) {
        return this.prisma.classes.findMany({
            where: {
                school_id: schoolId,
            },
            select: {
                id: true,
                class: true,
                section: true,
            },
            orderBy: {
                class: 'asc',
            },
        });
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map