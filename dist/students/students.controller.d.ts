import { StudentsService } from './students.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getStudentByUsername(username: string): Promise<{
        status: string;
        student: {
            name: string;
            gender: import(".prisma/client").$Enums.Gender;
            email: string;
            mobile: string;
            photo: Uint8Array<ArrayBufferLike> | null;
            class_id: number;
            school_id: number;
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
            id: number;
            username: string;
            name: string;
            gender: import(".prisma/client").$Enums.Gender;
            email: string;
            mobile: string;
            photo: Uint8Array | null;
            class_id: number;
            school_id: number;
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
            username: string;
            name: string;
            gender: import(".prisma/client").$Enums.Gender;
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
            username: string;
            name: string;
            gender: import(".prisma/client").$Enums.Gender;
            email: string;
            mobile: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
}
