import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string) {
    try {
      const student = await this.prisma.student.findUnique({
        where: { username },
        select: {
          name: true,
          gender: true,
          email: true,
          mobile: true,
          photo: true,
          class_id: true,
          school_id: true,
        },
      });

      return student
        ? { status: 'success', student }
        : {
            status: 'success',
            student: null,
            message: `No student found for username: ${username}`,
          };
    } catch (error) {
      console.error('Error in findByUsername:', error); // <-- also important
      throw error;
    }
  }



  async registerStudent(dto: RegisterStudentDto) {
    const existing = await this.prisma.student.findUnique({
      where: { username: dto.username },
    });

    if (existing) {
      return { status: 'error', message: 'Username already exists' };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const student = await this.prisma.student.create({
      data: {
        username: dto.username,
        name: dto.name,
        email: dto.email,
        gender: dto.gender,
        mobile: dto.mobile,
        class_id: Number(dto.class_id),
        school_id: Number(dto.school_id),
        password: hashedPassword,
      },
    });

    return { status: 'success', student };
  }
  async deleteStudent(username: string) {
    const exists = await this.prisma.student.findUnique({ where: { username } });

    if (!exists) {
      return { status: 'error', message: 'Student not found' };
    }

    await this.prisma.student.delete({ where: { username } });

    return { status: 'success', message: `Student '${username}' deleted.` };
  }
async changePassword(dto: ChangePasswordDto) {
  const student = await this.prisma.student.findUnique({
    where: { username: dto.username },
  });

  if (!student) {
    return { status: 'error', message: 'Student not found' };
  }

  const valid = await bcrypt.compare(dto.old_password, student.password);

  if (!valid) {
    return { status: 'error', message: 'Incorrect old password' };
  }

  const hashed = await bcrypt.hash(dto.new_password, 10);

  await this.prisma.student.update({
    where: { username: dto.username },
    data: { password: hashed },
  });

  return { status: 'success', message: 'Password changed successfully' };
}
async getAllByClass(class_id: string) {
  const students = await this.prisma.student.findMany({
    where: { class_id:Number(class_id) },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      mobile: true,
      gender: true,
    },
    orderBy: { name: 'asc' },
  });

  return {
    status: 'success',
    count: students.length,
    students,
  };
}
async getAllByClassAndSchool(class_id: string,school_id: string) {
  const students = await this.prisma.student.findMany({
    where: { class_id:Number(class_id) ,school_id:Number(school_id)},
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      mobile: true,
      gender: true,
    },
    orderBy: { name: 'asc' },
  });

  return {
    status: 'success',
    count: students.length,
    students,
  };
}
}
