import { StaffService } from './staff.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ChangeStaffPasswordDto } from './dto/change-password.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    updateProfile(username: string, updateData: UpdateStaffDto): Promise<{
        status: string;
        data: {
            school_id: number;
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            password: string;
            designation: string;
        };
    }>;
    getProfileByUsername1(username: string): Promise<{
        status: string;
        message: string;
        staff?: undefined;
    } | {
        status: string;
        staff: {
            id: number;
            username: string;
            email: string;
            school_id: number;
            name: string | null;
            designation: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        };
        message?: undefined;
    } | {
        status: string;
        staff: null;
        message: string;
    }>;
    getByUsername(username: string): Promise<{
        status: string;
        message: string;
        staff?: undefined;
    } | {
        status: string;
        staff: {
            school_id: number;
            name: string | null;
            designation: string;
            gender: import(".prisma/client").$Enums.Gender | null;
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
            school_id: number;
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            password: string;
            designation: string;
        };
        message?: undefined;
    }>;
    getAllBySchoolId(schoolId: string): Promise<{
        status: string;
        count: number;
        staff: {
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            designation: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    updateStaff(username: string, dto: UpdateStaffDto): Promise<{
        status: string;
        staff: {
            school_id: number;
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            password: string;
            designation: string;
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
    countStaff(schoolId: string): Promise<{
        status: string;
        count: number;
    }>;
}
