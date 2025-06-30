import { PrismaService } from '../common/prisma.service';
import { RegisterStaffDto } from './dto/register-staff.dto';
import { ChangeStaffPasswordDto } from './dto/change-password.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        id: number;
        designation: string;
        name: string;
        mobile: string;
        gender: import(".prisma/client").$Enums.Gender;
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
            name: string;
            email: string;
            mobile: string;
            gender: import(".prisma/client").$Enums.Gender;
            school_id: string;
            password: string;
        };
        message?: undefined;
    }>;
    getAllBySchool(school_id: string): Promise<{
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
            name: string;
            email: string;
            mobile: string;
            gender: import(".prisma/client").$Enums.Gender;
            school_id: string;
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
