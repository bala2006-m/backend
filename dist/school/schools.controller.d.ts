import { SchoolsService } from './schools.service';
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    getSchoolById(id: string): Promise<{
        status: string;
        message: string;
        schools?: undefined;
    } | {
        status: string;
        schools: {
            id: number;
            name: string;
            address: string;
            photo: string | null;
        }[];
        message?: undefined;
    }>;
}
