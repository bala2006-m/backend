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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const register_staff_dto_1 = require("./dto/register-staff.dto");
const update_staff_dto_1 = require("./dto/update-staff.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const common_2 = require("@nestjs/common");
let StaffController = class StaffController {
    staffService;
    constructor(staffService) {
        this.staffService = staffService;
    }
    async updateProfile(username, updateData) {
        const staff = await this.staffService.findByUsername(username);
        if (!staff) {
            throw new common_2.NotFoundException('Staff not found');
        }
        const updated = await this.staffService.updateProfile(username, updateData);
        return { status: 'success', data: updated };
    }
    async getProfileByUsername1(username) {
        if (!username) {
            return {
                status: 'error',
                message: 'Missing or empty username parameter.',
            };
        }
        try {
            const staff = await this.staffService.getProfileByUsername(username);
            if (staff) {
                return {
                    status: 'success',
                    staff: {
                        id: staff.id,
                        username: staff.username,
                        email: staff.email,
                        school_id: staff.school_id,
                        name: staff.name,
                        designation: staff.designation,
                        gender: staff.gender,
                        mobile: staff.mobile,
                    },
                };
            }
            else {
                return {
                    status: 'success',
                    staff: null,
                    message: `No staff found for username: ${username}`,
                };
            }
        }
        catch (error) {
            console.error('Controller error:', error);
            return {
                status: 'error',
                message: 'Database query failed.',
            };
        }
    }
    async getByUsername(username) {
        if (!username) {
            return {
                status: 'error',
                message: 'Missing or empty username parameter.',
            };
        }
        try {
            const staff = await this.staffService.findByUsername(username);
            if (staff) {
                return {
                    status: 'success',
                    staff: {
                        school_id: staff.school_id,
                        name: staff.name,
                        designation: staff.designation,
                        gender: staff.gender,
                        mobile: staff.mobile,
                    },
                };
            }
            else {
                return {
                    status: 'success',
                    staff: null,
                    message: `No staff found for username: ${username}`,
                };
            }
        }
        catch (error) {
            console.error('Controller error:', error);
            return {
                status: 'error',
                message: 'Database query failed.',
            };
        }
    }
    async register(dto) {
        return this.staffService.register(dto);
    }
    async getAllBySchoolId(schoolId) {
        if (!schoolId) {
            return { status: 'error', message: 'Missing school_id' };
        }
        return this.staffService.getAllBySchool(schoolId);
    }
    async updateStaff(username, dto) {
        if (!username) {
            return { status: 'error', message: 'Missing username' };
        }
        return this.staffService.updateStaff(username, dto);
    }
    async deleteStaff(username) {
        if (!username) {
            return { status: 'error', message: 'Missing username' };
        }
        return this.staffService.deleteStaff(username);
    }
    async changePassword(dto) {
        return this.staffService.changePassword(dto);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Put)('update/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('fetch-staffs'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getProfileByUsername1", null);
__decorate([
    (0, common_1.Get)('fetch-by-username'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getByUsername", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_staff_dto_1.RegisterStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('all-by-school'),
    __param(0, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getAllBySchoolId", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateStaff", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "deleteStaff", null);
__decorate([
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangeStaffPasswordDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "changePassword", null);
exports.StaffController = StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map