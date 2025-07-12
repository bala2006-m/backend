import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    fetchAdminData(username?: string): Promise<{
        status: string;
        data: {
            photo: string | null;
            school_id: number;
            name: string | null;
            mobile: string;
            designation: string;
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
