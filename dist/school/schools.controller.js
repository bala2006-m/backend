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
exports.SchoolsController = void 0;
const common_1 = require("@nestjs/common");
const schools_service_1 = require("./schools.service");
let SchoolsController = class SchoolsController {
    schoolsService;
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    async getSchoolById(id) {
        if (!id) {
            return { status: 'error', message: 'Missing school ID' };
        }
        try {
            const school = await this.schoolsService.findById(parseInt(id, 10));
            if (!school) {
                return { status: 'error', message: 'School not found' };
            }
            const photoBase64 = school.photo
                ? Buffer.from(school.photo).toString('base64')
                : null;
            return {
                status: 'success',
                schools: [
                    {
                        id: school.id,
                        name: school.name,
                        address: school.address,
                        photo: photoBase64,
                    },
                ],
            };
        }
        catch (error) {
            console.error('Error fetching school:', error);
            return { status: 'error', message: 'Internal server error' };
        }
    }
};
exports.SchoolsController = SchoolsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "getSchoolById", null);
exports.SchoolsController = SchoolsController = __decorate([
    (0, common_1.Controller)('fetch_school_data'),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService])
], SchoolsController);
//# sourceMappingURL=schools.controller.js.map