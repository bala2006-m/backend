import { PrismaService } from '../common/prisma.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdmin(username?: string): Promise<{
        photo: string | null;
        school_id: number;
        name: string | null;
        mobile: string;
        designation: string;
    }[]>;
    updateAdmin(username: string, data: UpdateAdminDto): Promise<{
        message: string;
    }>;
}
