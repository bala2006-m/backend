import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { CreateStaffAttendanceDto } from './dto/create-staff-attendance.dto';
import { FetchStudentAttendanceDto } from './dto/fetch-student-attendance.dto';
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('student')
  async markStudent(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.markStudentAttendance(dto);
  }
@Get('student/fetch_stu_attendance_by_class_id')
  async fetchStudentAttendance(@Query() query: FetchStudentAttendanceDto) {
    const { class_id, school_id, username } = query;

    if (!class_id || !school_id || !username) {
      return { status: 'error', message: 'Missing required parameters' };
    }

    const student = await this.attendanceService.fetchAttendanceByClassId(class_id, school_id, username);

    return {
      status: 'success',
      student,
    };
  }
  @Get('student/class')
  async getAttendanceByClassAndDate(
    @Query('class_id') classId: string,
    @Query('date') date: string,
  ) {
    if (!classId || !date) {
      return { status: 'error', message: 'Missing class_id or date' };
    }

    return this.attendanceService.getAttendanceByClassAndDate(classId, date);
  }
  @Get('student/monthly')
  async getMonthlySummary(
    @Query('username') username: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    if (!username || !month || !year) {
      return { status: 'error', message: 'Missing username, month, or year' };
    }

    return this.attendanceService.getMonthlySummary(username, +month, +year);
  }
@Get('student/daily-summary')
async getDailySummary(
  @Query('username') username: string,
  @Query('date') date: string,
) {
  if (!username || !date) {
    return { status: 'error', message: 'Missing username or date' };
  }

  return this.attendanceService.getDailySummary(username, date);
}

@Post('staff')
async markStaffAttendance(@Body() dto: CreateStaffAttendanceDto) {
  return this.attendanceService.markStaffAttendance(dto);
}
@Get('staff/daily-summary')
async getStaffDaily(
  @Query('username') username: string,
  @Query('date') date: string,
) {
  if (!username || !date) {
    return { status: 'error', message: 'Missing username or date' };
  }

  return this.attendanceService.getStaffDailySummary(username, date);
}
@Get('staff/monthly')
async getStaffMonthly(
  @Query('username') username: string,
  @Query('month') month: string,
  @Query('year') year: string,
) {
  return this.attendanceService.getStaffMonthly(username, +month, +year);
}

}
