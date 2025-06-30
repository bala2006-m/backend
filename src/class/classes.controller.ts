import { Controller, Get, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('class')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get('get_class_data')
  async getClassData(
    @Query('school_id') schoolId: string,
    @Query('class_id') classId: string,
  ) {
    if (!schoolId || !classId) {
      return {
        status: 'error',
        message: 'school_id and class_id are required',
      };
    }

    try {
      const classData = await this.classesService.getClassData(
        parseInt(schoolId, 10),
        parseInt(classId, 10),
      );

      return {
        status: 'success',
        class: classData,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch class data',
        details: error.message,
      };
    }
  }

  // GET /class/fetch_class_data?school_id=1
  @Get('fetch_class_data')
  async fetchClassData(@Query('school_id') schoolId: string) {
    if (!schoolId) {
      return {
        status: 'error',
        message: 'school_id is required',
      };
    }

    try {
      const classes = await this.classesService.fetchClassData(parseInt(schoolId, 10));

      return {
        status: 'success',
        classes,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch classes',
        details: error.message,
      };
    }
  }
}
