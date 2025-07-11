import { PrismaService } from '../common/prisma.service';
export declare class AttendanceUserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsersByRole(role: string): Promise<{
        school_id: number;
        id: number;
        username: string;
        password: string;
    }[]>;
}
