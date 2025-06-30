import { ClassesService } from './classes.service';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    getClassData(schoolId: string, classId: string): Promise<{
        status: string;
        message: string;
        class?: undefined;
        details?: undefined;
    } | {
        status: string;
        class: {
            class: string;
            section: string;
        } | null;
        message?: undefined;
        details?: undefined;
    } | {
        status: string;
        message: string;
        details: any;
        class?: undefined;
    }>;
    fetchClassData(schoolId: string): Promise<{
        status: string;
        message: string;
        classes?: undefined;
        details?: undefined;
    } | {
        status: string;
        classes: {
            class: string;
            id: number;
            section: string;
        }[];
        message?: undefined;
        details?: undefined;
    } | {
        status: string;
        message: string;
        details: any;
        classes?: undefined;
    }>;
}
