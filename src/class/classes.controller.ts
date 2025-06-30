import { Controller, Get, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('fetch_class_datas')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async getClassInfo(
    @Query('school_id') schoolId: string,
    @Query('class_id') classId: string,
  ) {
    if (!schoolId || !classId) {
      return {
        status: 'error',
        message: 'Missing required parameters: school_id and class_id',
      };
    }

    try {
      const classData = await this.classesService.getClassData(
        parseInt(schoolId, 10),
        parseInt(classId, 10),
      );

      if (!classData) {
        return {
          status: 'success',
          classes: [],
        };
      }

      return {
        status: 'success',
        classes: classData,
      };
    } catch (error) {
      console.error('Error fetching class data:', error);
      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
