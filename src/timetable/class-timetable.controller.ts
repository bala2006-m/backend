import { Controller, Get, Query } from '@nestjs/common';
import { ClassTimetableService } from './class-timetable.service';

@Controller('timetable')
export class ClassTimetableController {
  constructor(private readonly timetableService: ClassTimetableService) {}

  @Get()
  async getTimetable(
    @Query('schoolId') schoolId: string,
    @Query('classId') classId: string,
  ) {
    if (!schoolId || !classId) {
      return { status: 'error', message: 'Missing schoolId or classId' };
    }

    const result = await this.timetableService.getTimetable(schoolId, classId);
    return { status: 'success', timetable: result };
  }
}
