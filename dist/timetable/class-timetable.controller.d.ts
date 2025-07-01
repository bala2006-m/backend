import { ClassTimetableService } from './class-timetable.service';
import { SaveTimetableDto } from './dto/timetable.dto';
export declare class ClassTimetableController {
    private readonly timetableService;
    constructor(timetableService: ClassTimetableService);
    save(dto: SaveTimetableDto): Promise<{
        success: boolean;
        count: number;
    }>;
    getTimetable(schoolIdStr: string, classIdStr: string): Promise<{
        status: string;
        message: string;
        timetable?: undefined;
    } | {
        status: string;
        timetable: Record<string, any[]>;
        message?: undefined;
    }>;
}
