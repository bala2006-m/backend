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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const create_staff_attendance_dto_1 = require("./dto/create-staff-attendance.dto");
const fetch_student_attendance_dto_1 = require("./dto/fetch-student-attendance.dto");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async markStudent(dto) {
        return this.attendanceService.markStudentAttendance(dto);
    }
    async fetchStudentAttendance(query) {
        const { class_id, school_id, username } = query;
        if (!class_id || !school_id || !username) {
            return { status: 'error', message: 'Missing required parameters' };
        }
        const student = await this.attendanceService.fetchAttendanceByClassId(class_id, school_id, username);
        return {
            status: 'success',
            student,
        };
    }
    async getAttendanceByClassAndDate(classId, date) {
        if (!classId || !date) {
            return { status: 'error', message: 'Missing class_id or date' };
        }
        return this.attendanceService.getAttendanceByClassAndDate(classId, date);
    }
    async getMonthlySummary(username, month, year) {
        if (!username || !month || !year) {
            return { status: 'error', message: 'Missing username, month, or year' };
        }
        return this.attendanceService.getMonthlySummary(username, +month, +year);
    }
    async getDailySummary(username, date) {
        if (!username || !date) {
            return { status: 'error', message: 'Missing username or date' };
        }
        return this.attendanceService.getDailySummary(username, date);
    }
    async markStaffAttendance(dto) {
        return this.attendanceService.markStaffAttendance(dto);
    }
    async getStaffDaily(username, date) {
        if (!username || !date) {
            return { status: 'error', message: 'Missing username or date' };
        }
        return this.attendanceService.getStaffDailySummary(username, date);
    }
    async getStaffMonthly(username, month, year) {
        return this.attendanceService.getStaffMonthly(username, +month, +year);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('post_student_attendance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "markStudent", null);
__decorate([
    (0, common_1.Get)('student/fetch_stu_attendance_by_class_id'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_student_attendance_dto_1.FetchStudentAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "fetchStudentAttendance", null);
__decorate([
    (0, common_1.Get)('student/class'),
    __param(0, (0, common_1.Query)('class_id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAttendanceByClassAndDate", null);
__decorate([
    (0, common_1.Get)('student/monthly'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getMonthlySummary", null);
__decorate([
    (0, common_1.Get)('student/daily-summary'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getDailySummary", null);
__decorate([
    (0, common_1.Post)('staff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_attendance_dto_1.CreateStaffAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "markStaffAttendance", null);
__decorate([
    (0, common_1.Get)('staff/daily-summary'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStaffDaily", null);
__decorate([
    (0, common_1.Get)('staff/monthly'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStaffMonthly", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map