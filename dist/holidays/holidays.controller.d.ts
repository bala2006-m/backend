import { HolidaysService } from './holidays.service';
import { GetHolidaysByClassDto } from './dto/holidays.dto';
export declare class HolidaysController {
    private readonly holidaysService;
    constructor(holidaysService: HolidaysService);
    getByClass(query: GetHolidaysByClassDto): Promise<{
        status: string;
        holidays: {
            date: string;
            reason: string;
            fn?: string;
            an?: string;
        }[];
    }>;
}
