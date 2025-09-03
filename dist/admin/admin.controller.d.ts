import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    fetchAdminData(username?: string): Promise<{
        status: string;
        data: {
            photo: string | null;
            name: string | null;
            designation: string;
            mobile: string;
            school_id: number;
        }[];
        message?: undefined;
    } | {
        status: string;
        message: any;
        data?: undefined;
    }>;
    updateAdmin(username: string, dto: UpdateAdminDto): Promise<{
        message: string;
    }>;
}
