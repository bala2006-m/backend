import { ClassesService } from './classes.service';
import { FetchClassIdDto } from './dto/fetch-class-id.dto';
import { AddClassDto } from './dto/add-class.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    getAllClassesBySchool(schoolId: string): Promise<{
        id: number;
        class: string;
        section: string;
    }[]>;
    getClassNameByIdAndSchool(classId: string, schoolId: string): Promise<{
        status: string;
        data: {
            class: string;
            section: string;
        };
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
            id: number;
            class: string;
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
    fetchClassId(query: FetchClassIdDto): Promise<{
        status: string;
        class_id: number;
    }>;
}
