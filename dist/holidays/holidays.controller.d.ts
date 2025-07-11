import { HolidaysService } from './holidays.service';
import { GetHolidaysByClassDto } from './dto/holidays.dto';
import { DeleteHolidayDto } from './dto/delete-holiday.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
export declare class HolidaysController {
    private readonly holidaysService;
    constructor(holidaysService: HolidaysService);
    addHoliday(dto: CreateHolidayDto): Promise<{
        status: string;
        holiday: {
            id: number;
            date: Date;
            reason: string;
            school_id: number | null;
            class_ids: import("@prisma/client/runtime/library").JsonValue;
            fn: string | null;
            an: string;
        };
    }>;
    getByClass(query: GetHolidaysByClassDto): Promise<{
        status: string;
        holidays: {
            date: string;
            reason: string;
            fn?: string;
            an?: string;
        }[];
    }>;
    fetchHolidays(school_id: string): Promise<{
        status: string;
        holidays: {
            date: Date;
            reason: string;
            class_ids: import("@prisma/client/runtime/library").JsonValue;
            fn: string | null;
            an: string;
            classes: {
                id: number;
                class: string;
                section: string;
            }[];
        }[];
    }>;
    deleteHoliday(dto: DeleteHolidayDto): Promise<{
        status: string;
        message: string;
    }>;
}
