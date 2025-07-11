import { PrismaService } from '../common/prisma.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSchoolAndClassByUsername(username: string): Promise<{
        school_id: number;
        class_id: number;
    } | null>;
    findByUsername(username: string): Promise<{
        status: string;
        student: {
            school_id: number;
            name: string | null;
            class_id: number;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            photo: Uint8Array<ArrayBufferLike> | null;
        };
        message?: undefined;
    } | {
        status: string;
        student: null;
        message: string;
    }>;
    registerStudent(dto: RegisterStudentDto): Promise<{
        status: string;
        message: string;
        student?: undefined;
    } | {
        status: string;
        student: {
            school_id: number;
            id: number;
            name: string | null;
            class_id: number;
            username: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
            password: string;
            photo: Uint8Array | null;
        };
        message?: undefined;
    }>;
    deleteStudent(username: string): Promise<{
        status: string;
        message: string;
    }>;
    changeStudentPassword(dto: ChangePasswordDto): Promise<{
        status: string;
        message: string;
    }>;
    getAllByClass(class_id: string): Promise<{
        status: string;
        count: number;
        students: {
            id: number;
            name: string | null;
            username: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        }[];
    }>;
    getAllByClassAndSchool(class_id: string, school_id: string): Promise<{
        status: string;
        count: number;
        students: {
            id: number;
            name: string | null;
            username: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        }[];
    }>;
    countStudentsBySchool(schoolId: number): Promise<number>;
    getAllStudents(school_id?: string): Promise<{
        status: string;
        students: {
            name: string | null;
            username: string;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        }[];
        message?: undefined;
        details?: undefined;
    } | {
        status: string;
        message: string;
        details: any;
        students?: undefined;
    }>;
    findStudentByUsernameClassSchool(username: string, classId: number, schoolId: number): Promise<{
        name: string | null;
        email: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        mobile: string;
    } | null>;
}
