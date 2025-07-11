import { PrismaService } from '../common/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    checkAttendanceExists(schoolId: string, classId: string, date: string): Promise<boolean>;
    fetchAttendanceByClassId(class_id: string, school_id: string, username: string): Promise<{
        date: Date;
        fn_status: string;
        an_status: string;
    }[]>;
    markStudentAttendance(dto: CreateAttendanceDto): Promise<{
        status: string;
        message: string;
    }>;
    getStudentAttendance(date?: string, schoolId?: string): Promise<{
        username: string;
        date: Date;
        fn_status: string;
        an_status: string;
    }[]>;
    getAttendanceByClassAndDate(class_id: string, date: string, school_id: string): Promise<{
        status: string;
        count: number;
        attendance: {
            username: string;
            name: string | null;
            fn_status: string | null;
            an_status: string | null;
        }[];
    }>;
    getMonthlySummary(username: string, month: number, year: number): Promise<{
        status: string;
        count: number;
        month: number;
        year: number;
        records: {
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
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
    }>;
    markStaffAttendance(dto: CreateStaffAttendanceDto): Promise<{
        status: string;
        message: string;
    }>;
    getStaffDailySummary(username: string, date: string): Promise<{
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
    }>;
    getStaffMonthly(username: string, month: number, year: number): Promise<{
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
    fetchAttendance(date?: string, schoolId?: string): Promise<{
        status: string;
        staff: {
            username: string;
            date: Date;
            fn_status: string;
            an_status: string;
        }[];
    }>;
    getAbsentees(date: Date, schoolId: number, classId: number, sessionField: 'fn_status' | 'an_status'): Promise<string[]>;
}
