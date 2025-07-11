import { PrismaService } from '../common/prisma.service';
import { AddClassDto } from './dto/add-class.dto';
export declare class ClassesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllClassesBySchool(schoolId: number): Promise<{
        id: number;
        class: string;
        section: string;
    }[]>;
    findClassName(classId: number, schoolId: number): Promise<{
        class: string;
        section: string;
    }>;
    addClass(dto: AddClassDto): Promise<{
        status: string;
        message: string;
        data: {
            class: string;
            section: string;
            school_id: number;
        };
    }>;
    findClassId(school_id: string, className: string, section: string): Promise<number | null>;
    getClassData(schoolId: number, classId: number): Promise<{
        class: string;
        section: string;
    } | null>;
    fetchClassData(schoolId: number): Promise<{
        id: number;
        class: string;
        section: string;
    }[]>;
}
