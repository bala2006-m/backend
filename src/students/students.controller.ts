import { Body, Post, Controller, Get,Delete,Put, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('by-username')
  async getStudentByUsername(@Query('username') username: string) {
    try {
      if (!username) {
        return { status: 'error', message: 'Missing or empty username' };
      }

      return await this.studentsService.findByUsername(username);
    } catch (error) {
      console.error('Error in getStudentByUsername:', error); // <-- this is what we need
      return { status: 'error', message: 'Internal server error' };
    }
  }


  @Post('register')
    async registerStudent(@Body() dto: RegisterStudentDto) {
      return this.studentsService.registerStudent(dto);
    }
 @Delete('delete')
  async deleteStudent(@Query('username') username: string) {
    if (!username) {
      return { status: 'error', message: 'Missing username' };
    }

    return this.studentsService.deleteStudent(username);
  }
  @Put('change-password')
    async changePassword(@Body() dto: ChangePasswordDto) {
      return this.studentsService.changePassword(dto);
    }
@Get('all-by-class')
  async getAllByClass(@Query('class_id') classId: string) {
    if (!classId) {
      return { status: 'error', message: 'Missing class_id' };
    }

    return this.studentsService.getAllByClass(classId);
  }


  @Get('fetch-student-data')
    async getAllByClassAndSchool(@Query('class_id') classId: string, @Query('school_id') schoolId: string ) {
      if (!classId||!schoolId) {
        return { status: 'error', message: 'Missing class_id or school_id' };
      }

      return this.studentsService.getAllByClass(classId);
    }

}
