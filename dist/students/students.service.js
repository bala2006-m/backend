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
exports.StudentsService = void 0;
const prisma_service_1 = require("../common/prisma.service");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
let StudentsService = class StudentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSchoolAndClassByUsername(username) {
        return this.prisma.student.findUnique({
            where: { username },
            select: {
                school_id: true,
                class_id: true,
            },
        });
    }
    async findByUsername(username) {
        try {
            const student = await this.prisma.student.findUnique({
                where: { username },
                select: {
                    name: true,
                    gender: true,
                    email: true,
                    mobile: true,
                    photo: true,
                    class_id: true,
                    school_id: true,
                },
            });
            return student
                ? { status: 'success', student }
                : {
                    status: 'success',
                    student: null,
                    message: `No student found for username: ${username}`,
                };
        }
        catch (error) {
            console.error('Error in findByUsername:', error);
            throw error;
        }
    }
    async registerStudent(dto) {
        const existing = await this.prisma.student.findUnique({
            where: { username: dto.username },
        });
        if (existing) {
            return { status: 'error', message: 'Username already exists' };
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const student = await this.prisma.student.create({
            data: {
                username: dto.username,
                name: dto.name,
                email: dto.email,
                gender: dto.gender,
                mobile: dto.mobile,
                class_id: Number(dto.class_id),
                school_id: Number(dto.school_id),
                password: hashedPassword,
            },
        });
        return { status: 'success', student };
    }
    async deleteStudent(username) {
        const exists = await this.prisma.student.findUnique({ where: { username } });
        if (!exists) {
            return { status: 'error', message: 'Student not found' };
        }
        await this.prisma.student.delete({ where: { username } });
        return { status: 'success', message: `Student '${username}' deleted.` };
    }
    async changeStudentPassword(dto) {
        const { username, newPassword, confirmPassword } = dto;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const user = await this.prisma.attendance_user.findUnique({
            where: { username },
        });
        if (!user || user.role !== 'student') {
            throw new common_1.BadRequestException('Student not found or invalid role');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.attendance_user.update({
            where: { username },
            data: { password: hashedPassword },
        });
        return { status: 'success', message: 'Password updated successfully' };
    }
    async getAllByClass(class_id) {
        const students = await this.prisma.student.findMany({
            where: { class_id: Number(class_id) },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                mobile: true,
                gender: true,
            },
            orderBy: { name: 'asc' },
        });
        return {
            status: 'success',
            count: students.length,
            students,
        };
    }
    async getAllByClassAndSchool(class_id, school_id) {
        const students = await this.prisma.student.findMany({
            where: { class_id: Number(class_id), school_id: Number(school_id) },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                mobile: true,
                gender: true,
            },
            orderBy: { name: 'asc' },
        });
        return {
            status: 'success',
            count: students.length,
            students,
        };
    }
    async countStudentsBySchool(schoolId) {
        return await this.prisma.student.count({
            where: {
                school_id: schoolId,
            },
        });
    }
    async getAllStudents(school_id) {
        try {
            const whereClause = school_id
                ? { school_id: parseInt(school_id, 10) }
                : {};
            const students = await this.prisma.student.findMany({
                where: whereClause,
                orderBy: { name: 'asc' },
                select: {
                    username: true,
                    name: true,
                    gender: true,
                    email: true,
                    mobile: true,
                },
            });
            return {
                status: 'success',
                students,
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Query failed',
                details: error.message,
            };
        }
    }
    async findStudentByUsernameClassSchool(username, classId, schoolId) {
        return this.prisma.student.findFirst({
            where: {
                username,
                class_id: classId,
                school_id: schoolId,
            },
            select: {
                name: true,
                gender: true,
                email: true,
                mobile: true,
            },
        });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map