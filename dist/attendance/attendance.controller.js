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
    async getAbsentStudents(date, schoolId, classId) {
        if (!date || !schoolId || !classId) {
            throw new common_1.BadRequestException('Missing parameters');
        }
        const parsedDate = new Date(date);
        const schoolIdInt = parseInt(schoolId);
        const classIdInt = parseInt(classId);
        const fnAbsentees = await this.attendanceService.getAbsentees(parsedDate, schoolIdInt, classIdInt, 'fn_status');
        const anAbsentees = await this.attendanceService.getAbsentees(parsedDate, schoolIdInt, classIdInt, 'an_status');
        return {
            status: 'success',
            fn_absentees: fnAbsentees,
            an_absentees: anAbsentees,
        };
    }
    async checkAttendanceStatus(schoolId, classId, date) {
        if (!schoolId || !classId || !date) {
            throw new common_1.BadRequestException('Missing required parameters: school_id, class_id, or date');
        }
        const attendanceExists = await this.attendanceService.checkAttendanceExists(schoolId, classId, date);
        return {
            status: 'success',
            attendance_exists: attendanceExists,
        };
    }
    async markStudent(dto) {
        return this.attendanceService.markStudentAttendance(dto);
    }
    async fetchStudentAttendances(date, schoolId) {
        if (!schoolId) {
            throw new common_1.BadRequestException('Missing school_id');
        }
        const attendance = await this.attendanceService.getStudentAttendance(date, schoolId);
        return {
            status: 'success',
            staff: attendance,
        };
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
    async getAttendanceByClassAndDate(classId, date, schoolId) {
        if (!classId || !date) {
            return { status: 'error', message: 'Missing class_id or date' };
        }
        return this.attendanceService.getAttendanceByClassAndDate(classId, date, schoolId);
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
    async fetchStaffAttendance(date, schoolId) {
        if (date && !schoolId) {
            throw new common_1.BadRequestException('school_id is required when filtering by date');
        }
        return this.attendanceService.fetchAttendance(date, schoolId);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)('fetch_stu_absent_all'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('school_id')),
    __param(2, (0, common_1.Query)('class_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getAbsentStudents", null);
__decorate([
    (0, common_1.Get)('check_attendance_status'),
    __param(0, (0, common_1.Query)('school_id')),
    __param(1, (0, common_1.Query)('class_id')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkAttendanceStatus", null);
__decorate([
    (0, common_1.Post)('post_student_attendance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "markStudent", null);
__decorate([
    (0, common_1.Get)('student/fetch_stu_attendance'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "fetchStudentAttendances", null);
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
    __param(2, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
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
__decorate([
    (0, common_1.Get)('staff/fetch_staff_attendance'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "fetchStaffAttendance", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map