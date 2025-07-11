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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(data) {
        const { username, password, role, school_id } = data;
        const existingUser = await this.prisma.attendance_user.findUnique({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await this.prisma.attendance_user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role,
                    school_id,
                },
            });
            return {
                "status": "success",
                "message": "Registration successful",
                "username": newUser.username,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Registration failed: ' + error.message);
        }
    }
    async registerDesignation(dto) {
        const { username, designation, school_id, mobile, table, email, classId, name, gender } = dto;
        const schoolIdInt = parseInt(school_id);
        const classIdInt = parseInt(classId);
        const tableMap = {
            admin: async () => {
                const exists = await this.prisma.admin.findUnique({ where: { username } });
                if (exists)
                    throw new common_1.ConflictException('Username already exists in admin');
                return this.prisma.admin.create({
                    data: {
                        username,
                        designation,
                        school_id: schoolIdInt,
                        mobile,
                    },
                });
            },
            staff: async () => {
                const exists = await this.prisma.staff.findUnique({ where: { username } });
                if (exists)
                    throw new common_1.ConflictException('Username already exists in staff');
                return this.prisma.staff.create({
                    data: {
                        username,
                        designation,
                        school_id: schoolIdInt,
                        mobile,
                        password: '',
                        email: '',
                    },
                });
            },
            students: async () => {
                const exists = await this.prisma.student.findUnique({ where: { username } });
                if (exists)
                    throw new common_1.ConflictException('Username already exists in students');
                return this.prisma.student.create({
                    data: {
                        username,
                        name,
                        gender,
                        school_id: schoolIdInt,
                        mobile,
                        password: '',
                        class_id: classIdInt,
                        email,
                    },
                });
            },
        };
        const insertFn = tableMap[table];
        if (!insertFn) {
            throw new common_1.BadRequestException('Invalid table name');
        }
        const result = await insertFn();
        return {
            status: 'success',
            message: 'Designation registration successful',
            table,
            username,
        };
    }
    async registerStudent(dto) {
        const { username, name, gender, email, mobile, class_id, school_id } = dto;
        const exists = await this.prisma.student.findUnique({
            where: { username },
        });
        if (exists) {
            throw new common_1.ConflictException('Username already exists');
        }
        try {
            const student = await this.prisma.student.create({
                data: {
                    username,
                    name,
                    gender,
                    email,
                    mobile,
                    class_id: Number(class_id),
                    school_id: Number(school_id),
                    password: '',
                },
            });
            return {
                status: 'success',
                message: 'Registration successful',
                username: student.username,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Registration failed: ' + error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map