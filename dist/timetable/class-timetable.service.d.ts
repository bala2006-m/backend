import { PrismaService } from '../common/prisma.service';
export declare class ClassTimetableService {
    private prisma;
    constructor(prisma: PrismaService);
    saveTimetables(data: string): Promise<{
        success: boolean;
        count: number;
    }>;
    getTimetable(schoolId: number, classesId: number): Promise<Record<string, any[]>>;
    findByClass(schoolId: number, classesId: number): Promise<{
        id: number;
        schoolId: number | null;
        classesId: number | null;
        dayOfWeek: import(".prisma/client").$Enums.DayOfWeek;
        periodNumber: number;
        subject: string;
    }[]>;
}
