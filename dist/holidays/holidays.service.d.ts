import { PrismaService } from '../common/prisma.service';
export declare class HolidaysService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHolidaysByClass(schoolId: string, classId: string): Promise<{
        status: string;
        holidays: {
            date: string;
            reason: string;
            fn?: string;
            an?: string;
        }[];
    }>;
}
