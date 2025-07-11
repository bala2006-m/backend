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
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const classes_service_1 = require("./classes.service");
const fetch_class_id_dto_1 = require("./dto/fetch-class-id.dto");
const add_class_dto_1 = require("./dto/add-class.dto");
let ClassesController = class ClassesController {
    classesService;
    constructor(classesService) {
        this.classesService = classesService;
    }
    async getAllClassesBySchool(schoolId) {
        return this.classesService.getAllClassesBySchool(parseInt(schoolId));
    }
    async getClassNameByIdAndSchool(classId, schoolId) {
        const result = await this.classesService.findClassName(+classId, +schoolId);
        return {
            status: 'success',
            data: result,
        };
    }
    async addClass(dto) {
        return this.classesService.addClass(dto);
    }
    async getClassData(schoolId, classId) {
        if (!schoolId || !classId) {
            return {
                status: 'error',
                message: 'school_id and class_id are required',
            };
        }
        try {
            const classData = await this.classesService.getClassData(parseInt(schoolId, 10), parseInt(classId, 10));
            return {
                status: 'success',
                class: classData,
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Failed to fetch class data',
                details: error.message,
            };
        }
    }
    async fetchClassData(schoolId) {
        if (!schoolId) {
            return {
                status: 'error',
                message: 'school_id is required',
            };
        }
        try {
            const classes = await this.classesService.fetchClassData(parseInt(schoolId, 10));
            return {
                status: 'success',
                classes,
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Failed to fetch classes',
                details: error.message,
            };
        }
    }
    async fetchClassId(query) {
        const { school_id, class: className, section } = query;
        const classId = await this.classesService.findClassId(school_id.toString(), className.toString(), section);
        if (!classId) {
            throw new common_1.NotFoundException('Class not found');
        }
        return {
            status: 'success',
            class_id: classId,
        };
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)('all/:schoolId'),
    __param(0, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "getAllClassesBySchool", null);
__decorate([
    (0, common_1.Get)('get-name'),
    __param(0, (0, common_1.Query)('class_id')),
    __param(1, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "getClassNameByIdAndSchool", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_class_dto_1.AddClassDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "addClass", null);
__decorate([
    (0, common_1.Get)('get_class_data'),
    __param(0, (0, common_1.Query)('school_id')),
    __param(1, (0, common_1.Query)('class_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "getClassData", null);
__decorate([
    (0, common_1.Get)('fetch_class_data'),
    __param(0, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "fetchClassData", null);
__decorate([
    (0, common_1.Get)('fetch_class_id'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_class_id_dto_1.FetchClassIdDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "fetchClassId", null);
exports.ClassesController = ClassesController = __decorate([
    (0, common_1.Controller)('class'),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map