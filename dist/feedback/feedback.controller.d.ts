import { PrismaService } from '../common/prisma.service';
export declare class FeedbackController {
    private prisma;
    constructor(prisma: PrismaService);
    storeFeedback(body: any): Promise<{
        status: string;
        data: {
            feedback: string;
            school_id: number;
            class_id: number;
            id: number;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
}
