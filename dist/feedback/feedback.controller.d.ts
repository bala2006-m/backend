import { PrismaService } from '../common/prisma.service';
export declare class FeedbackController {
    private prisma;
    constructor(prisma: PrismaService);
    storeFeedback(body: any): Promise<{
        status: string;
        data: {
            feedback: string;
            school_id: number;
            id: number;
            name: string;
            class_id: number;
            email: string;
            created_at: Date;
        };
    }>;
}
