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
exports.ClassTimetableController = void 0;
const common_1 = require("@nestjs/common");
const class_timetable_service_1 = require("./class-timetable.service");
const timetable_dto_1 = require("./dto/timetable.dto");
let ClassTimetableController = class ClassTimetableController {
    timetableService;
    constructor(timetableService) {
        this.timetableService = timetableService;
    }
    async save(dto) {
        return this.timetableService.saveTimetables(dto.data);
    }
    async getTimetable(schoolIdStr, classIdStr) {
        const schoolId = parseInt(schoolIdStr);
        const classId = parseInt(classIdStr);
        if (isNaN(schoolId) || isNaN(classId)) {
            return { status: 'error', message: 'Invalid schoolId or classId' };
        }
        const result = await this.timetableService.getTimetable(schoolId, classId);
        return { status: 'success', timetable: result };
    }
};
exports.ClassTimetableController = ClassTimetableController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timetable_dto_1.SaveTimetableDto]),
    __metadata("design:returntype", Promise)
], ClassTimetableController.prototype, "save", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassTimetableController.prototype, "getTimetable", null);
exports.ClassTimetableController = ClassTimetableController = __decorate([
    (0, common_1.Controller)('timetable'),
    __metadata("design:paramtypes", [class_timetable_service_1.ClassTimetableService])
], ClassTimetableController);
//# sourceMappingURL=class-timetable.controller.js.map