import { PrismaService } from '../common/prisma.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { ChangeStaffPasswordDto } from './dto/change-password.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(username: string, data: UpdateStaffDto): Promise<{
        id: number;
        username: string;
        designation: string;
        name: string | null;
        email: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
        school_id: number;
        password: string;
    }>;
    getProfileByUsername(username: string): Promise<{
        id: number;
        username: string;
        designation: string;
        name: string | null;
        email: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
        school_id: number;
    } | null>;
    findByUsername(username: string): Promise<{
        designation: string;
        name: string | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
        school_id: number;
    } | null>;
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
            name: string | null;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            school_id: number;
            password: string;
        };
        message?: undefined;
    }>;
    getAllBySchool(school_id: number): Promise<{
        status: string;
        count: number;
        staff: {
            id: number;
            username: string;
            name: string | null;
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
            id: number;
            username: string;
            designation: string;
            name: string | null;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            school_id: number;
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
}
