import { PrismaService } from '../common/prisma.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdmin(username?: string): Promise<{
        photo: string | null;
        name: string | null;
        designation: string;
        mobile: string;
        school_id: number;
    }[]>;
    updateAdmin(username: string, data: UpdateAdminDto): Promise<{
        message: string;
    }>;
}
