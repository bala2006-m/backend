import { ClassesService } from './classes.service';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    getClassInfo(schoolId: string, classId: string): Promise<{
        status: string;
        message: string;
        classes?: undefined;
    } | {
        status: string;
        classes: never[];
        message?: undefined;
    } | {
        status: string;
        classes: {
            class: string;
            section: string;
        };
        message?: undefined;
    }>;
}
