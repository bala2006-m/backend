import { StaffService } from './staff.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ChangeStaffPasswordDto } from './dto/change-password.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    getByUsername(username: string): Promise<{
        status: string;
        message: string;
        staff?: undefined;
    } | {
        status: string;
        staff: {
            id: number;
            name: string;
            designation: string;
            gender: import(".prisma/client").$Enums.Gender;
            mobile: string;
        };
        message?: undefined;
    } | {
        status: string;
        staff: null;
        message: string;
    }>;
    register(dto: RegisterStaffDto): Promise<{
        status: string;
        message: string;
        staff?: undefined;
    } | {
        status: string;
        staff: {
            id: number;
            username: string;
            designation: string;
            name: string;
            email: string;
            mobile: string;
            gender: import(".prisma/client").$Enums.Gender;
            school_id: string;
            password: string;
        };
        message?: undefined;
    }>;
    getAllBySchoolId(schoolId: string): Promise<{
        status: string;
        count: number;
        staff: {
            id: number;
            username: string;
            name: string;
            email: string;
            mobile: string;
            gender: import(".prisma/client").$Enums.Gender;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    updateStaff(username: string, dto: UpdateStaffDto): Promise<{
        status: string;
        staff: {
            id: number;
            username: string;
            designation: string;
            name: string;
            email: string;
            mobile: string;
            gender: import(".prisma/client").$Enums.Gender;
            school_id: string;
            password: string;
        };
        message?: undefined;
    } | {
        status: string;
        message: string;
    }>;
    deleteStaff(username: string): Promise<{
        status: string;
        message: string;
    }>;
    changePassword(dto: ChangeStaffPasswordDto): Promise<{
        status: string;
        message: string;
    }>;
}
