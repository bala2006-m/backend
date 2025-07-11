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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAdmin(username) {
        if (username) {
            const admin = await this.prisma.admin.findUnique({
                where: { username },
                select: {
                    name: true,
                    designation: true,
                    mobile: true,
                    photo: true,
                    school_id: true,
                },
            });
            if (!admin)
                return [];
            return [
                {
                    ...admin,
                    photo: admin.photo ? Buffer.from(admin.photo).toString('base64') : null,
                },
            ];
        }
        else {
            const admins = await this.prisma.admin.findMany({
                select: {
                    name: true,
                    designation: true,
                    mobile: true,
                    photo: true,
                    school_id: true,
                },
            });
            return admins.map((admin) => ({
                ...admin,
                photo: admin.photo ? Buffer.from(admin.photo).toString('base64') : null,
            }));
        }
    }
    async updateAdmin(username, data) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { username },
        });
        if (!existingAdmin) {
            throw new Error(`Admin with username "${username}" not found.`);
        }
        const updateData = {
            name: data.name,
            designation: data.designation,
            mobile: data.mobile,
        };
        if (data.photoBase64) {
            updateData.photo = Buffer.from(data.photoBase64, 'base64');
        }
        await this.prisma.admin.update({
            where: { username },
            data: updateData,
        });
        return { message: 'Profile updated successfully' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map