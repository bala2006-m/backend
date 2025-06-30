import { PrismaService } from '../common/prisma.service';
export declare class ClassesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getClassData(schoolId: number, classId: number): Promise<{
        class: string;
        section: string;
    } | null>;
    fetchClassData(schoolId: number): Promise<{
        class: string;
        id: number;
        section: string;
    }[]>;
}
