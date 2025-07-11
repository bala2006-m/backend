import { PrismaService } from '../common/prisma.service';
export declare class SchoolsService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<{
        id: number;
        name: string;
        photo: Uint8Array<ArrayBufferLike>;
        address: string;
    } | null>;
}
