"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTimetableModule = void 0;
const common_1 = require("@nestjs/common");
const class_timetable_service_1 = require("./class-timetable.service");
const class_timetable_controller_1 = require("./class-timetable.controller");
const prisma_service_1 = require("../common/prisma.service");
let ClassTimetableModule = class ClassTimetableModule {
};
exports.ClassTimetableModule = ClassTimetableModule;
exports.ClassTimetableModule = ClassTimetableModule = __decorate([
    (0, common_1.Module)({
        controllers: [class_timetable_controller_1.ClassTimetableController],
        providers: [class_timetable_service_1.ClassTimetableService, prisma_service_1.PrismaService],
    })
], ClassTimetableModule);
//# sourceMappingURL=class-timetable.module.js.map