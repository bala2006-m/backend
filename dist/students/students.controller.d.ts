import { StudentsService } from './students.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getStudentByUsername(username: string): Promise<{
        status: string;
        student: {
            school_id: number;
            class_id: number;
            name: string | null;
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
            class_id: number;
            username: string;
            name: string | null;
            id: number;
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
    changePassword(dto: ChangePasswordDto): Promise<{
        status: string;
        message: string;
    }>;
    getAllByClass(classId: string): Promise<{
        status: string;
        count: number;
        students: {
            username: string;
            name: string | null;
            id: number;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
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
            username: string;
            name: string | null;
            id: number;
            email: string;
            gender: import(".prisma/client").$Enums.Gender | null;
            mobile: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
}
