import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
import { FetchStudentAttendanceDto } from './dto/fetch-student-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    getAbsentStudents(date: string, schoolId: string, classId: string): Promise<{
        status: string;
        fn_absentees: string[];
        an_absentees: string[];
    }>;
    checkAttendanceStatus(schoolId: string, classId: string, date: string): Promise<{
        status: string;
        attendance_exists: boolean;
    }>;
    markStudent(dto: CreateAttendanceDto): Promise<{
        status: string;
        message: string;
    }>;
    fetchStudentAttendances(date?: string, schoolId?: string): Promise<{
        status: string;
        staff: {
            username: string;
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
    }>;
    fetchStudentAttendance(query: FetchStudentAttendanceDto): Promise<{
        status: string;
        message: string;
        student?: undefined;
    } | {
        status: string;
        student: {
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
        message?: undefined;
    }>;
    getAttendanceByClassAndDate(classId: string, date: string, schoolId: string): Promise<{
        status: string;
        count: number;
        attendance: {
            username: string;
            name: string | null;
            fn_status: string | null;
            an_status: string | null;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    getMonthlySummary(username: string, month: string, year: string): Promise<{
        status: string;
        count: number;
        month: number;
        year: number;
        records: {
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
    } | {
        status: string;
        message: string;
    }>;
    getDailySummary(username: string, date: string): Promise<{
        status: string;
        date: string;
        username: string;
        record: {
            fn_status: string;
            an_status: string;
        } | {
            fn_status: null;
            an_status: null;
        };
    } | {
        status: string;
        message: string;
    }>;
    markStaffAttendance(dto: CreateStaffAttendanceDto): Promise<{
        status: string;
        message: string;
    }>;
    getStaffDaily(username: string, date: string): Promise<{
        status: string;
        date: string;
        username: string;
        record: {
            fn_status: string;
            an_status: string;
        } | {
            fn_status: null;
            an_status: null;
        };
    } | {
        status: string;
        message: string;
    }>;
    getStaffMonthly(username: string, month: string, year: string): Promise<{
        status: string;
        username: string;
        month: number;
        year: number;
        records: {
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
    }>;
    fetchStaffAttendance(date?: string, schoolId?: string): Promise<{
        status: string;
        staff: {
            username: string;
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
    }>;
}
