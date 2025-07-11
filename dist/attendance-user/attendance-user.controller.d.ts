import { AttendanceUserService } from './attendance-user.service';
export declare class AttendanceUserController {
    private readonly attendanceUserService;
    constructor(attendanceUserService: AttendanceUserService);
    getUsersByRole(role: string): Promise<{
        school_id: number;
        id: number;
        username: string;
        password: string;
    }[]>;
}
