import { PrismaService } from '../common/prisma.service';
import { DeleteHolidayDto } from './dto/delete-holiday.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
export declare class HolidaysService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addHoliday(dto: CreateHolidayDto): Promise<{
        status: string;
        holiday: {
            date: Date;
            school_id: number | null;
            reason: string;
            class_ids: import("@prisma/client/runtime/library").JsonValue;
            fn: string | null;
            an: string;
            id: number;
        };
    }>;
    fetchHolidays(school_id: string): Promise<{
        status: string;
        holidays: {
            classes: {
                id: number;
                class: string;
                section: string;
            }[];
            date: Date;
            reason: string;
            class_ids: import("@prisma/client/runtime/library").JsonValue;
            fn: string | null;
            an: string;
        }[];
    }>;
    getHolidaysByClass(schoolId: string, classId: string): Promise<{
        status: string;
        holidays: {
            date: string;
            reason: string;
            fn?: string;
            an?: string;
        }[];
    }>;
    deleteHoliday(dto: DeleteHolidayDto): Promise<{
        status: string;
        message: string;
    }>;
}
