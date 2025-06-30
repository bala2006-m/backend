import { PrismaService } from '../common/prisma.service';
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    createFeedback(data: {
        name: string;
        email: string;
        feedback: string;
        schoolId: number;
        classId: number;
    }): Promise<{
        message: string;
    }>;
}
