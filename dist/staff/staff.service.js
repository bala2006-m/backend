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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const bcrypt = require("bcrypt");
let StaffService = class StaffService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(username, data) {
        return this.prisma.staff.update({
            where: { username },
            data,
        });
    }
    async getProfileByUsername(username) {
        if (!username) {
            throw new common_1.BadRequestException('Username is required');
        }
        return this.prisma.staff.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                mobile: true,
                gender: true,
                designation: true,
                school_id: true,
            },
        });
    }
    async findByUsername(username) {
        try {
            return await this.prisma.staff.findUnique({
                where: { username },
                select: {
                    school_id: true,
                    name: true,
                    designation: true,
                    gender: true,
                    mobile: true,
                },
            });
        }
        catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
    async register(dto) {
        const exists = await this.prisma.staff.findUnique({
            where: { username: dto.username },
        });
        if (exists) {
            return { status: 'error', message: 'Username already exists' };
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        const staff = await this.prisma.staff.create({
            data: {
                username: dto.username,
                designation: dto.designation,
                name: dto.name,
                email: dto.email,
                gender: dto.gender,
                mobile: dto.mobile,
                school_id: dto.school_id,
                password: hashed,
            },
        });
        return { status: 'success', staff };
    }
    async getAllBySchool(school_id) {
        const staffList = await this.prisma.staff.findMany({
            where: { school_id },
            select: {
                id: true,
                username: true,
                designation: true,
                name: true,
                email: true,
                gender: true,
                mobile: true,
            },
            orderBy: { name: 'asc' },
        });
        return {
            status: 'success',
            count: staffList.length,
            staff: staffList,
        };
    }
    async updateStaff(username, dto) {
        const staff = await this.prisma.staff.findUnique({ where: { username } });
        if (!staff) {
            return { status: 'error', message: 'Staff not found' };
        }
        const updated = await this.prisma.staff.update({
            where: { username },
            data: dto,
        });
        return { status: 'success', staff: updated };
    }
    async deleteStaff(username) {
        const exists = await this.prisma.staff.findUnique({ where: { username } });
        if (!exists) {
            return { status: 'error', message: 'Staff not found' };
        }
        await this.prisma.staff.delete({ where: { username } });
        return { status: 'success', message: `Staff '${username}' deleted.` };
    }
    async changePassword(dto) {
        const staff = await this.prisma.staff.findUnique({
            where: { username: dto.username },
        });
        if (!staff) {
            return { status: 'error', message: 'Staff not found' };
        }
        const valid = await bcrypt.compare(dto.old_password, staff.password);
        if (!valid) {
            return { status: 'error', message: 'Incorrect old password' };
        }
        const hashed = await bcrypt.hash(dto.new_password, 10);
        await this.prisma.staff.update({
            where: { username: dto.username },
            data: { password: hashed },
        });
        return { status: 'success', message: 'Password updated successfully' };
    }
    async countStaffBySchoolId(schoolId) {
        const count = await this.prisma.staff.count({
            where: {
                school_id: schoolId,
            },
        });
        return {
            status: 'success',
            count,
        };
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map