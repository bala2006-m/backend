import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async createFeedback(data: {
    name: string;
    email: string;
    feedback: string;
    schoolId: number;
    classId: number;
  }) {
    const { name, email, feedback, schoolId, classId } = data;

    const query = `
      INSERT INTO feedback (name, email, feedback, school_id, class_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    await this.prisma.$executeRawUnsafe(
      query,
      name,
      email,
      feedback,
      schoolId,
      classId,
    );

    return { message: 'Feedback inserted using raw SQL' };
  }
}
