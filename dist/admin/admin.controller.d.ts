import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    fetchAdminData(username?: string): Promise<{
        status: string;
        data: any[];
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
