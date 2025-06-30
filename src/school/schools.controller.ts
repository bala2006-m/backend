import { Controller, Get, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service';

@Controller('fetch_school_data')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  async getSchoolById(@Query('id') id: string) {
    if (!id) {
      return { status: 'error', message: 'Missing school ID' };
    }

    try {
      const school = await this.schoolsService.findById(parseInt(id, 10));

      if (!school) {
        return { status: 'error', message: 'School not found' };
      }

      const photoBase64 = school.photo
        ? Buffer.from(school.photo).toString('base64')
        : null;

      return {
        status: 'success',
        schools: [
          {
            id: school.id,
            name: school.name,
            address: school.address,
            photo: photoBase64,
          },
        ],
      };
    } catch (error) {
      console.error('Error fetching school:', error);
      return { status: 'error', message: 'Internal server error' };
    }
  }
}
