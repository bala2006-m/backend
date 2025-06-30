import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(schoolId: number, date: string): Promise<{
        status: string;
        school_id: number;
        date: string;
        summary: {
            students: {
                total: number;
                fn_present: any;
                fn_absent: any;
                an_present: any;
                an_absent: any;
            };
            staff: {
                total: number;
                fn_present: any;
                fn_absent: any;
                an_present: any;
                an_absent: any;
            };
        };
    } | {
        status: string;
        message: string;
    }>;
    getClassSummary(schoolId: number, date: string): Promise<{
        status: string;
        school_id: number;
        date: string;
        summary: {
            class_id: string;
            total_students: number;
            fn_present: number;
            fn_absent: number;
            an_present: number;
            an_absent: number;
        }[];
    } | {
        status: string;
        message: string;
    }>;
}
