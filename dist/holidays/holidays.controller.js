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
exports.HolidaysController = void 0;
const common_1 = require("@nestjs/common");
const holidays_service_1 = require("./holidays.service");
const holidays_dto_1 = require("./dto/holidays.dto");
const delete_holiday_dto_1 = require("./dto/delete-holiday.dto");
const create_holiday_dto_1 = require("./dto/create-holiday.dto");
let HolidaysController = class HolidaysController {
    holidaysService;
    constructor(holidaysService) {
        this.holidaysService = holidaysService;
    }
    addHoliday(dto) {
        return this.holidaysService.addHoliday(dto);
    }
    async getByClass(query) {
        const { school_id, class_id } = query;
        return this.holidaysService.getHolidaysByClass(school_id, class_id);
    }
    async fetchHolidays(school_id) {
        if (!school_id) {
            throw new common_1.BadRequestException('Missing required parameter: school_id');
        }
        return this.holidaysService.fetchHolidays(school_id);
    }
    deleteHoliday(dto) {
        return this.holidaysService.deleteHoliday(dto);
    }
};
exports.HolidaysController = HolidaysController;
__decorate([
    (0, common_1.Post)('add_holiday'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_holiday_dto_1.CreateHolidayDto]),
    __metadata("design:returntype", void 0)
], HolidaysController.prototype, "addHoliday", null);
__decorate([
    (0, common_1.Get)('class'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [holidays_dto_1.GetHolidaysByClassDto]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getByClass", null);
__decorate([
    (0, common_1.Get)('fetch'),
    __param(0, (0, common_1.Query)('school_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "fetchHolidays", null);
__decorate([
    (0, common_1.Post)('/delete_holiday'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_holiday_dto_1.DeleteHolidayDto]),
    __metadata("design:returntype", void 0)
], HolidaysController.prototype, "deleteHoliday", null);
exports.HolidaysController = HolidaysController = __decorate([
    (0, common_1.Controller)('holidays'),
    __metadata("design:paramtypes", [holidays_service_1.HolidaysService])
], HolidaysController);
//# sourceMappingURL=holidays.controller.js.map