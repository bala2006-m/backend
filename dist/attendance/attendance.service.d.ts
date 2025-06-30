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
    markStudentAttendance(dto: CreateAttendanceDto): Promise<void>;
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
            fn_status: string | null;
            an_status: string | null;
        }[];
    }>;
    getDailySummary(username: string, date: string): Promise<{
        status: string;
        date: string;
        username: string;
        record: {
            fn_status: string | null;
            an_status: string | null;
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
            fn_status: string | null;
            an_status: string | null;
        };
    }>;
    getStaffMonthly(username: string, month: number, year: number): Promise<{
        status: string;
        username: string;
        month: number;
        year: number;
        records: {
            date: Date;
            fn_status: string | null;
            an_status: string | null;
        }[];
    }>;
}
