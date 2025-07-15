import { PrismaService } from '../common/prisma.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAdmin(username?: string): Promise<any[]>;
    updateAdmin(username: string, data: UpdateAdminDto): Promise<{
        message: string;
    }>;
}
