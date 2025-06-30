import { PrismaService } from '../common/prisma.service';
export declare class ClassTimetableService {
    private prisma;
    constructor(prisma: PrismaService);
    getTimetable(schoolId: string, classId: string): Promise<Record<string, any[]>>;
}
