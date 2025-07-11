import { PrismaService } from '../common/prisma.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { ChangeStaffPasswordDto } from './dto/change-password.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(username: string, data: UpdateStaffDto): Promise<{
        school_id: number;
        id: number;
        name: string | null;
        username: string;
        designation: string;
        email: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
        password: string;
    }>;
    getProfileByUsername(username: string): Promise<{
        school_id: number;
        id: number;
        name: string | null;
        username: string;
        designation: string;
        email: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
    } | null>;
    findByUsername(username: string): Promise<{
        school_id: number;
        name: string | null;
        designation: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
    } | null>;
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
            designation: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            password: string;
        };
        message?: undefined;
    }>;
    getAllBySchool(school_id: number): Promise<{
        status: string;
        count: number;
        staff: {
            id: number;
            name: string | null;
            username: string;
            designation: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        }[];
    }>;
    updateStaff(username: string, dto: UpdateStaffDto): Promise<{
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
            designation: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            password: string;
        };
        message?: undefined;
    }>;
    deleteStaff(username: string): Promise<{
        status: string;
        message: string;
    }>;
    changePassword(dto: ChangeStaffPasswordDto): Promise<{
        status: string;
        message: string;
    }>;
    countStaffBySchoolId(schoolId: number): Promise<{
        status: string;
        count: number;
    }>;
}
