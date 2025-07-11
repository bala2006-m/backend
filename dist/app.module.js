"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const holidays_module_1 = require("./holidays/holidays.module");
const attendance_module_1 = require("./attendance/attendance.module");
const staff_module_1 = require("./staff/staff.module");
const students_module_1 = require("./students/students.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const db_module_1 = require("./db/db.module");
const class_timetable_module_1 = require("./timetable/class-timetable.module");
const feedback_module_1 = require("./feedback/feedback.module");
const schools_module_1 = require("./school/schools.module");
const classes_module_1 = require("./class/classes.module");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const attendance_user_module_1 = require("./attendance-user/attendance-user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            students_module_1.StudentsModule,
            holidays_module_1.HolidaysModule,
            attendance_module_1.AttendanceModule,
            staff_module_1.StaffModule,
            dashboard_module_1.DashboardModule,
            db_module_1.DbModule,
            class_timetable_module_1.ClassTimetableModule,
            feedback_module_1.FeedbackModule,
            schools_module_1.SchoolsModule,
            classes_module_1.ClassesModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            attendance_user_module_1.AttendanceUserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map