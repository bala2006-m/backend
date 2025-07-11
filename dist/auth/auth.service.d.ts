import { PrismaService } from '../common/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterDesignationDto } from './dto/register-designation.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(data: RegisterDto): Promise<{
        status: string;
        message: string;
        username: string;
    }>;
    registerDesignation(dto: RegisterDesignationDto): Promise<{
        status: string;
        message: string;
        table: string;
        username: string;
    }>;
    registerStudent(dto: RegisterStudentDto): Promise<{
        status: string;
        message: string;
        username: string;
    }>;
}
