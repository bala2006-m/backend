import { StudentsService } from './students.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getSchoolAndClass(username: string): Promise<{
        school_id: number;
        class_id: number;
    } | null>;
    fetchAllStudents(schoolId?: string): Promise<{
        status: string;
        students: {
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
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
    getStudentByUsername(username: string): Promise<{
        status: string;
        student: {
            school_id: number;
            name: string | null;
            class_id: number;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            photo: Uint8Array<ArrayBufferLike> | null;
        };
        message?: undefined;
    } | {
        status: string;
        student: null;
        message: string;
    } | {
        status: string;
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
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
            photo: Uint8Array | null;
            password: string;
        };
        message?: undefined;
    }>;
    deleteStudent(username: string): Promise<{
        status: string;
        message: string;
    }>;
    changePassword(dto: ChangePasswordDto): Promise<{
        status: string;
        message: string;
    }>;
    getAllByClass(classId: string): Promise<{
        status: string;
        count: number;
        students: {
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    getAllByClassAndSchool(classId: string, schoolId: string): Promise<{
        status: string;
        count: number;
        students: {
            id: number;
            name: string | null;
            username: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    countStudents(schoolId?: string): Promise<{
        status: string;
        count: number;
    }>;
    getStudentByUsername1(username: string, schoolId: string, classId: string): Promise<{
        status: string;
        message: string;
        student?: undefined;
    } | {
        status: string;
        student: {
            name: string | null;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string;
            mobile: string;
        };
        message?: undefined;
    }>;
}
