import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterDesignationDto } from './dto/register-designation.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
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
