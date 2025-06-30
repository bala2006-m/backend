import { ClassTimetableService } from './class-timetable.service';
export declare class ClassTimetableController {
    private readonly timetableService;
    constructor(timetableService: ClassTimetableService);
    getTimetable(schoolId: string, classId: string): Promise<{
        status: string;
        message: string;
        timetable?: undefined;
    } | {
        status: string;
        timetable: Record<string, any[]>;
        message?: undefined;
    }>;
}
