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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const register_student_dto_1 = require("./dto/register-student.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
let StudentsController = class StudentsController {
    studentsService;
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getSchoolAndClass(username) {
        return this.studentsService.getSchoolAndClassByUsername(username);
    }
    async fetchAllStudents(schoolId) {
        return this.studentsService.getAllStudents(schoolId);
    }
    async getStudentByUsername(username) {
        try {
            if (!username) {
                return { status: 'error', message: 'Missing or empty username' };
            }
            return await this.studentsService.findByUsername(username);
        }
        catch (error) {
            console.error('Error in getStudentByUsername:', error);
            return { status: 'error', message: 'Internal server error' };
        }
    }
    async registerStudent(dto) {
        return this.studentsService.registerStudent(dto);
    }
    async deleteStudent(username) {
        if (!username) {
            return { status: 'error', message: 'Missing username' };
        }
        return this.studentsService.deleteStudent(username);
    }
    async changePassword(dto) {
        return this.studentsService.changeStudentPassword(dto);
    }
    async getAllByClass(classId) {
        if (!classId) {
            return { status: 'error', message: 'Missing class_id' };
        }
        return this.studentsService.getAllByClass(classId);
    }
    async getAllByClassAndSchool(classId, schoolId) {
        if (!classId || !schoolId) {
            return { status: 'error', message: 'Missing class_id or school_id' };
        }
        return this.studentsService.getAllByClass(classId);
    }
    async countStudents(schoolId) {
        if (!schoolId) {
            throw new common_1.BadRequestException({
                status: 'failure',
                message: 'Missing or empty school_id',
            });
        }
        const id = parseInt(schoolId, 10);
        if (isNaN(id)) {
            throw new common_1.BadRequestException({
                status: 'failure',
                message: 'Invalid school_id',
            });
        }
        const count = await this.studentsService.countStudentsBySchool(id);
        return {
            status: 'success',
            count,
        };
    }
    async getStudentByUsername1(username, schoolId, classId) {
        if (!username || !schoolId || !classId) {
            throw new common_1.BadRequestException('Missing parameters');
        }
        const schoolIdInt = parseInt(schoolId);
        const classIdInt = parseInt(classId);
        const student = await this.studentsService.findStudentByUsernameClassSchool(username, classIdInt, schoolIdInt);
        if (!student) {
            return {
                status: 'error',
                message: 'Student not found',
            };
        }
        return {
            status: 'success',
            student: {
                name: student.name,
                gender: student.gender,
                email: student.email,
                mobile: student.mobile,
            },
        };
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)('school-class'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getSchoolAndClass", null);
__decorate([
    (0, common_1.Get)('fetch_all_student_data'),
    __param(0, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "fetchAllStudents", null);
__decorate([
    (0, common_1.Get)('by-username'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentByUsername", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_student_dto_1.RegisterStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "registerStudent", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('all-by-class'),
    __param(0, (0, common_1.Query)('class_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAllByClass", null);
__decorate([
    (0, common_1.Get)('fetch-student-data'),
    __param(0, (0, common_1.Query)('class_id')),
    __param(1, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAllByClassAndSchool", null);
__decorate([
    (0, common_1.Get)('count_student'),
    __param(0, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "countStudents", null);
__decorate([
    (0, common_1.Get)('fetch_student_name'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('school_id')),
    __param(2, (0, common_1.Query)('class_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentByUsername1", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map