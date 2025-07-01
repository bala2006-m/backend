import { PrismaService } from '../common/prisma.service';
export declare class ClassTimetableService {
    private prisma;
    constructor(prisma: PrismaService);
    saveTimetables(data: string): Promise<{
        success: boolean;
        count: number;
    }>;
    getTimetable(schoolId: number, classId: number): Promise<Record<string, any[]>>;
    findByClass(school_id: string, class_id: string): Promise<{
        school_id: string;
        class_id: string;
        id: number;
        dayOfWeek: string;
        periodNumber: number;
        subject: string;
        schoolId: number | null;
        classesId: number | null;
    }[]>;
}
