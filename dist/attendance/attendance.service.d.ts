import { PrismaService } from '../common/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchAttendanceByClassId(class_id: string, school_id: string, username: string): Promise<{
        date: Date;
        fn_status: string;
        an_status: string;
    }[]>;
    markStudentAttendance(dto: CreateAttendanceDto): Promise<{
        status: string;
        message: string;
    }>;
    getAttendanceByClassAndDate(class_id: string, date: string): Promise<{
        status: string;
        count: number;
        attendance: any[];
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
}
